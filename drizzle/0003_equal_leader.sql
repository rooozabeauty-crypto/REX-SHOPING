CREATE TABLE `store_integrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`storeType` enum('salla','zid','shopify','woocommerce') NOT NULL,
	`storeName` varchar(256) NOT NULL,
	`accessToken` text NOT NULL,
	`refreshToken` text,
	`storeUrl` varchar(512),
	`metadata` json,
	`isActive` boolean NOT NULL DEFAULT true,
	`lastSyncedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `store_integrations_id` PRIMARY KEY(`id`)
);
