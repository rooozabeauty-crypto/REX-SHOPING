import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";
import { getDb } from "./db";
import {
  campaigns,
  designRequests,
  feedback,
  updates,
  chatMessages,
  stripeSubscriptions,
  stripePayments,
  stripeInvoices,
} from "../drizzle/schema";
import {
  createCheckoutSession,
  getUserActiveSubscription,
  getUserPaymentHistory,
  getUserInvoices,
} from "./stripe-helpers";
import { eq, desc } from "drizzle-orm";
import { z } from "zod/v4";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // AI Assistant (REX Assistant)
  assistant: router({
    chat: publicProcedure
      .input(
        z.object({
          message: z.string().min(1).max(2000),
          sessionId: z.string(),
          history: z
            .array(
              z.object({
                role: z.enum(["user", "assistant"]),
                content: z.string(),
              })
            )
            .optional()
            .default([]),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        const systemPrompt = `أنت ريكس، المساعد الذكي الشخصي لمنصة REX-SHOP للتسويق الرقمي.
تتحدث العربية الفصحى واللهجة الخليجية بشكل طبيعي ومريح.
أنت خبير في:
- التسويق الرقمي وتحسين محركات البحث SEO
- إعلانات Google Ads وتحليلات Google Analytics
- إدارة وسائل التواصل الاجتماعي
- التجارة الإلكترونية ومتاجر سلة وزد وشوبيفاي
- التصميم الجرافيكي والهوية البصرية
- استراتيجيات التسويق والمحتوى
- المحاسبة المالية للمتاجر الإلكترونية

تقدم حلولاً عملية وواضحة، وتستخدم أمثلة من السوق الخليجي.
تكون ودوداً ومتحمساً ومشجعاً للعملاء.
إذا سألك أحد عن خدمة غير متوفرة، اقترح البديل المتاح في REX-SHOP.
معلومات التواصل: البريد nrjseah00@gmail.com والواتساب 0508047159`;

        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...input.history.map(h => ({
            role: h.role as "user" | "assistant",
            content: h.content,
          })),
          { role: "user" as const, content: input.message },
        ];

        const response = await invokeLLM({
          messages: messages as Array<{
            role: "system" | "user" | "assistant";
            content: string;
          }>,
        });
        const assistantMessage =
          (response.choices[0]?.message?.content as string) ||
          "عذراً، حدث خطأ. حاول مرة أخرى.";

        if (db) {
          await db.insert(chatMessages).values({
            userId: ctx.user?.id,
            sessionId: input.sessionId,
            role: "user",
            content: input.message,
          });
          await db.insert(chatMessages).values({
            userId: ctx.user?.id,
            sessionId: input.sessionId,
            role: "assistant",
            content: assistantMessage,
          });
        }

        return { message: assistantMessage };
      }),
  }),

  // Campaigns
  campaigns: router({
    generate: protectedProcedure
      .input(
        z.object({
          type: z.enum(["text", "post", "email", "seo"]),
          platform: z.string(),
          tone: z.string(),
          productName: z.string().min(1).max(200),
          productDesc: z.string().optional().default(""),
          language: z.string().default("arabic"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const langInstruction =
          input.language === "arabic"
            ? "اكتب المحتوى باللغة العربية الفصحى مع لمسة خليجية"
            : input.language === "english"
              ? "Write the content in professional English"
              : "Write the content in both Arabic and English";

        const typeInstructions: Record<string, string> = {
          text: "إعلان نصي قصير وجذاب مناسب للإعلانات المدفوعة",
          post: `منشور تسويقي احترافي لمنصة ${input.platform} مع هاشتاقات مناسبة وإيموجي`,
          email:
            "رسالة بريد إلكتروني تسويقية احترافية مع عنوان جذاب ومحتوى مقنع",
          seo: "مقال تسويقي محسّن لمحركات البحث مع كلمات مفتاحية مناسبة",
        };

        const prompt = `${langInstruction}
نوع المحتوى: ${typeInstructions[input.type] || input.type}
المنتج/الخدمة: ${input.productName}
${input.productDesc ? `وصف إضافي: ${input.productDesc}` : ""}
نبرة المحتوى: ${input.tone}
المنصة: ${input.platform}

أنشئ محتوى تسويقياً احترافياً ومقنعاً يجذب العملاء ويزيد المبيعات.`;

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content:
                "أنت خبير تسويق رقمي متخصص في إنشاء محتوى إعلاني احترافي للسوق الخليجي.",
            },
            { role: "user", content: prompt },
          ],
        });

        const content = (response.choices[0]?.message?.content as string) || "";

        const db = await getDb();
        if (db) {
          await db.insert(campaigns).values({
            userId: ctx.user.id,
            title: `حملة ${input.productName} - ${input.type}` as string,
            type: input.type as "text" | "post" | "video" | "email" | "seo",
            content: content as string,
            platform: input.platform as string,
            status: "draft" as const,
          });
        }

        return { content };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return await db
        .select()
        .from(campaigns)
        .where(eq(campaigns.userId, ctx.user.id))
        .orderBy(desc(campaigns.createdAt))
        .limit(20);
    }),
  }),

  // Design
  design: router({
    generate: protectedProcedure
      .input(
        z.object({
          prompt: z.string().min(1).max(500),
          style: z.string().default("modern"),
          category: z.string().default("logo"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const styleMap: Record<string, string> = {
          modern: "modern, contemporary, clean",
          classic: "classic, traditional, timeless",
          minimalist: "minimalist, simple, clean, white space",
          bold: "bold, strong, impactful, high contrast",
          elegant: "elegant, luxury, sophisticated, premium",
          playful: "playful, fun, colorful, creative",
          tech: "tech, digital, futuristic, innovative",
          arabic: "arabic calligraphy, islamic art, oriental",
        };

        const enhancedPrompt = `Professional ${input.category} design: ${input.prompt}. Style: ${styleMap[input.style] || input.style}. High quality, vector-style, suitable for business use, transparent background.`;

        const result = await generateImage({ prompt: enhancedPrompt });

        const db = await getDb();
        if (db) {
          await db.insert(designRequests).values({
            userId: ctx.user.id,
            prompt: input.prompt,
            imageUrl: result.url,
            style: input.style,
            status: "completed",
          });
        }

        return { imageUrl: result.url };
      }),

    history: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return await db
        .select()
        .from(designRequests)
        .where(eq(designRequests.userId, ctx.user.id))
        .orderBy(desc(designRequests.createdAt))
        .limit(20);
    }),
  }),

  // Feedback
  feedback: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(256),
          email: z.string().email().optional(),
          message: z.string().min(5).max(2000),
          rating: z.number().min(1).max(5).optional(),
          type: z
            .enum(["review", "suggestion", "complaint", "support"])
            .default("review"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        await db.insert(feedback).values({
          userId: ctx.user?.id,
          name: input.name,
          email: input.email,
          message: input.message,
          rating: input.rating,
          type: input.type,
          status: "pending",
        });

        return { success: true };
      }),

    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return await db
        .select()
        .from(feedback)
        .where(eq(feedback.status, "reviewed"))
        .orderBy(desc(feedback.createdAt))
        .limit(10);
    }),
  }),

  // Platform Updates
  updates: router({
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return await db
        .select()
        .from(updates)
        .where(eq(updates.isPublished, true))
        .orderBy(desc(updates.createdAt))
        .limit(20);
    }),

    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1).max(512),
          description: z.string().min(1),
          version: z.string().optional(),
          type: z
            .enum(["feature", "improvement", "bugfix", "announcement"])
            .default("feature"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "غير مصرح لك بهذا الإجراء",
          });
        }
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        await db.insert(updates).values({
          title: input.title,
          description: input.description,
          version: input.version,
          type: input.type,
          isPublished: true,
          publishedAt: new Date(),
        });

        return { success: true };
      }),
  }),

  // Stripe Payments
  stripe: router({
    createCheckoutSession: protectedProcedure
      .input(
        z.object({
          priceId: z.string(),
          planId: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const successUrl = `${ctx.req.headers.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${ctx.req.headers.origin}/pricing`;

        const url = await createCheckoutSession(
          ctx.user.id,
          ctx.user.email || "",
          input.priceId,
          successUrl,
          cancelUrl,
          ctx.user.name || undefined
        );

        return { url };
      }),

    getSubscription: protectedProcedure.query(async ({ ctx }) => {
      return await getUserActiveSubscription(ctx.user.id);
    }),

    getPaymentHistory: protectedProcedure.query(async ({ ctx }) => {
      return await getUserPaymentHistory(ctx.user.id);
    }),

    getInvoices: protectedProcedure.query(async ({ ctx }) => {
      return await getUserInvoices(ctx.user.id);
    }),
  }),

  // Admin
  admin: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      const db = await getDb();
      if (!db) return { campaigns: 0, designs: 0, feedback: 0 };

      const [campaignRows, designRows, feedbackRows] = await Promise.all([
        db.select().from(campaigns).limit(1000),
        db.select().from(designRequests).limit(1000),
        db.select().from(feedback).limit(1000),
      ]);

      return {
        campaigns: campaignRows.length,
        designs: designRows.length,
        feedback: feedbackRows.length,
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
