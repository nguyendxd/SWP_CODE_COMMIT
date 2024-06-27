using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE_V2.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderLog",
                columns: table => new
                {
                    LogID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderID = table.Column<int>(type: "int", nullable: false),
                    Phase1 = table.Column<bool>(type: "bit", nullable: false),
                    Phase2 = table.Column<bool>(type: "bit", nullable: false),
                    Phase3 = table.Column<bool>(type: "bit", nullable: false),
                    Phase4 = table.Column<bool>(type: "bit", nullable: false),
                    PhaseTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__OrderLog__A5D58A608123E0B0", x => x.LogID);
                    table.ForeignKey(
                        name: "FK__OrderLog__OrderID__02FC7413",
                        column: x => x.OrderID,
                        principalTable: "Orders",
                        principalColumn: "OrderID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderLog_OrderID",
                table: "OrderLog",
                column: "OrderID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderLog");
        }
    }
}
