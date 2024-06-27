using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE_V2.Migrations
{
    /// <inheritdoc />
    public partial class AddEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishlistItems_WishlistItems_WishlistItemId1",
                table: "WishlistItems");

            migrationBuilder.DropIndex(
                name: "IX_WishlistItems_WishlistItemId1",
                table: "WishlistItems");

            migrationBuilder.DropColumn(
                name: "WishlistItemId1",
                table: "WishlistItems");

            migrationBuilder.CreateTable(
                name: "Event",
                columns: table => new
                {
                    EventID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", maxLength: 2147483647, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Event__1E20497A", x => x.EventID);
                });

            migrationBuilder.CreateTable(
                name: "EventItem",
                columns: table => new
                {
                    EventItemID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventID = table.Column<int>(type: "int", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(5,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__EventItem__1BFD2C07", x => x.EventItemID);
                    table.ForeignKey(
                        name: "FK__EventItem__EventID__02FC7413",
                        column: x => x.EventID,
                        principalTable: "Event",
                        principalColumn: "EventID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__EventItem__ProductID__02FC7413",
                        column: x => x.ProductID,
                        principalTable: "Product",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventItem_EventID",
                table: "EventItem",
                column: "EventID");

            migrationBuilder.CreateIndex(
                name: "IX_EventItem_ProductID",
                table: "EventItem",
                column: "ProductID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventItem");

            migrationBuilder.DropTable(
                name: "Event");

            migrationBuilder.AddColumn<int>(
                name: "WishlistItemId1",
                table: "WishlistItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WishlistItems_WishlistItemId1",
                table: "WishlistItems",
                column: "WishlistItemId1");

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistItems_WishlistItems_WishlistItemId1",
                table: "WishlistItems",
                column: "WishlistItemId1",
                principalTable: "WishlistItems",
                principalColumn: "WishlistItemID");
        }
    }
}
