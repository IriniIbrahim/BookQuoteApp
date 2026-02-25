using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookQuoteApi.Migrations
{
    /// <inheritdoc />
    public partial class AddBookIdToQuotes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "Quotes");

            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "Quotes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookId",
                table: "Quotes");

            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Quotes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
