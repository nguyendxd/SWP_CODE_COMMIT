ALTER TABLE [dbo].[Product] DROP CONSTRAINT [FK_Product_NecklaceMold];
ALTER TABLE [dbo].[Product] DROP CONSTRAINT [FK_Product_RingMold];

ALTER TABLE [dbo].[Product] DROP COLUMN [MoldId];

ALTER TABLE [dbo].[Product] ADD [RingMoldId] [int] NULL;
ALTER TABLE [dbo].[Product] ADD [NecklaceMoldId] [int] NULL;

-- Add foreign key constraints to the new columns
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_RingMold] FOREIGN KEY([RingMoldId])
REFERENCES [dbo].[RingMold] ([RingMoldId]);
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_RingMold];

ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_NecklaceMold] FOREIGN KEY([NecklaceMoldId])
REFERENCES [dbo].[NecklaceMold] ([NecklaceMoldId]);
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_NecklaceMold];