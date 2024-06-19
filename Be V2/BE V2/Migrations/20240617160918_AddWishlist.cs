using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE_V2.Migrations
{
    /// <inheritdoc />
    public partial class AddWishlist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "Wishlist",
                columns: table => new
                {
                    WishlistID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerID = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Wishlist__233189CB03175B66", x => x.WishlistID);
                    table.ForeignKey(
                        name: "FK__Wishlist__Custom__02FC7413",
                        column: x => x.CustomerID,
                        principalTable: "Customer",
                        principalColumn: "CustomerID",
                        onDelete: ReferentialAction.Cascade);
                });


            migrationBuilder.CreateTable(
                name: "WishlistItems",
                columns: table => new
                {
                    WishlistItemID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WishlistID = table.Column<int>(type: "int", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    AddedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WishlistItemId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Wishlist__171E21813C0A4C5A", x => x.WishlistItemID);
                    table.ForeignKey(
                        name: "FK_WishlistItems_WishlistItems_WishlistItemId1",
                        column: x => x.WishlistItemId1,
                        principalTable: "WishlistItems",
                        principalColumn: "WishlistItemID");
                    table.ForeignKey(
                        name: "FK__WishlistI__Produ__06CD04F7",
                        column: x => x.ProductID,
                        principalTable: "Product",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__WishlistI__Wishl__05D8E0BE",
                        column: x => x.WishlistID,
                        principalTable: "Wishlist",
                        principalColumn: "WishlistID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserID",
                table: "Cart",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_CartID",
                table: "CartItem",
                column: "CartID");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_ProductID",
                table: "CartItem",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_Wishlist_CustomerID",
                table: "Wishlist",
                column: "CustomerID");

            migrationBuilder.CreateIndex(
                name: "IX_WishlistItems_ProductID",
                table: "WishlistItems",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_WishlistItems_WishlistID",
                table: "WishlistItems",
                column: "WishlistID");

            migrationBuilder.CreateIndex(
                name: "IX_WishlistItems_WishlistItemId1",
                table: "WishlistItems",
                column: "WishlistItemId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartItem");

            migrationBuilder.DropTable(
                name: "WishlistItems");

            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "Wishlist");
        }
    }
}
