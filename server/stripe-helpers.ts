import Stripe from "stripe";
import { getDb } from "./db";
import {
  stripeSubscriptions,
  stripePayments,
  stripeInvoices,
  users,
} from "../drizzle/schema";
import { eq } from "drizzle-orm";

let stripe: any = null;

function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-04-10",
    });
  }
  return stripe;
}

/**
 * Create or get a Stripe customer for a user
 */
export async function getOrCreateStripeCustomer(
  userId: number,
  email: string,
  name?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Get user from database
  const userRecord = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (userRecord.length > 0 && userRecord[0].stripeCustomerId) {
    return userRecord[0].stripeCustomerId;
  }

  // Create new Stripe customer
  const stripeClient = getStripe();
  if (!stripeClient) throw new Error("Stripe not configured");
  const customer = await stripeClient.customers.create({
    email,
    name,
    metadata: {
      userId: userId.toString(),
    },
  });

  // Save customer ID to database
  await db
    .update(users)
    .set({ stripeCustomerId: customer.id })
    .where(eq(users.id, userId));

  return customer.id;
}

/**
 * Create a checkout session for subscription
 */
export async function createCheckoutSession(
  userId: number,
  email: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  name?: string
) {
  const customerId = await getOrCreateStripeCustomer(userId, email, name);

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId: userId.toString(),
      customer_email: email,
      customer_name: name || "",
    },
  });

  return session.url;
}

/**
 * Create a one-time payment checkout session
 */
export async function createPaymentCheckoutSession(
  userId: number,
  email: string,
  amount: number,
  currency: string,
  description: string,
  successUrl: string,
  cancelUrl: string,
  name?: string
) {
  const customerId = await getOrCreateStripeCustomer(userId, email, name);

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: description,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId: userId.toString(),
      customer_email: email,
      customer_name: name || "",
    },
  });

  return session.url;
}

/**
 * Handle subscription created webhook
 */
export async function handleSubscriptionCreated(
  subscription: Stripe.Subscription
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const userId = parseInt(subscription.metadata?.userId || "0");
  if (!userId) return;

  const priceId = subscription.items.data[0]?.price.id;
  if (!priceId) return;

  await db.insert(stripeSubscriptions).values({
    userId,
    stripeSubscriptionId: subscription.id,
    stripePriceId: priceId,
    status: subscription.status as any,
    currentPeriodStart: new Date(
      (subscription as any).current_period_start * 1000
    ),
    currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
  });
}

/**
 * Handle subscription updated webhook
 */
export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(stripeSubscriptions)
    .set({
      status: subscription.status as any,
      currentPeriodStart: new Date(
        (subscription as any).current_period_start * 1000
      ),
      currentPeriodEnd: new Date(
        (subscription as any).current_period_end * 1000
      ),
      canceledAt: (subscription as any).canceled_at
        ? new Date((subscription as any).canceled_at * 1000)
        : null,
    })
    .where(eq(stripeSubscriptions.stripeSubscriptionId, subscription.id));
}

/**
 * Handle subscription deleted webhook
 */
export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(stripeSubscriptions)
    .set({
      status: "canceled",
      canceledAt: new Date(),
    })
    .where(eq(stripeSubscriptions.stripeSubscriptionId, subscription.id));
}

/**
 * Handle payment intent succeeded webhook
 */
export async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const userId = parseInt(paymentIntent.metadata?.userId || "0");
  if (!userId) return;

  await db.insert(stripePayments).values({
    userId,
    stripePaymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: "succeeded",
    description: paymentIntent.description || "",
    metadata: paymentIntent.metadata,
  });
}

/**
 * Handle invoice paid webhook
 */
export async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const userId = parseInt(invoice.metadata?.userId || "0");
  if (!userId) return;

  await db.insert(stripeInvoices).values({
    userId,
    stripeInvoiceId: invoice.id,
    stripeSubscriptionId: (invoice as any).subscription as string,
    amount: invoice.total,
    currency: invoice.currency,
    status: "paid",
    pdfUrl: (invoice as any).pdf || "",
  });
}

/**
 * Get user's active subscription
 */
export async function getUserActiveSubscription(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(stripeSubscriptions)
    .where(eq(stripeSubscriptions.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Get user's payment history
 */
export async function getUserPaymentHistory(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(stripePayments)
    .where(eq(stripePayments.userId, userId))
    .orderBy(t => t.createdAt);
}

/**
 * Get user's invoices
 */
export async function getUserInvoices(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(stripeInvoices)
    .where(eq(stripeInvoices.userId, userId))
    .orderBy(t => t.createdAt);
}

export { getStripe };
