using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE_V2.Migrations
{
    /// <inheritdoc />
    public partial class latestOrderLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhaseTime",
                table: "OrderLog",
                newName: "TimePhase4");

            migrationBuilder.AddColumn<DateTime>(
                name: "TimePhase1",
                table: "OrderLog",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TimePhase2",
                table: "OrderLog",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TimePhase3",
                table: "OrderLog",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimePhase1",
                table: "OrderLog");

            migrationBuilder.DropColumn(
                name: "TimePhase2",
                table: "OrderLog");

            migrationBuilder.DropColumn(
                name: "TimePhase3",
                table: "OrderLog");

            migrationBuilder.RenameColumn(
                name: "TimePhase4",
                table: "OrderLog",
                newName: "PhaseTime");
        }
    }
}
