using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BookQuoteApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedQuotes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Quotes",
                columns: new[] { "Id", "Author", "BookId", "IsArchived", "Text" },
                values: new object[,]
                {
                    { 1, "Steve Jobs", 0, false, "The only way to do great work is to love what you do." },
                    { 2, "John Lennon", 0, false, "Life is what happens when you're busy making other plans." },
                    { 3, "Eleanor Roosevelt", 0, false, "The future belongs to those who believe in the beauty of their dreams." },
                    { 4, "Aristotle", 0, false, "It is during our darkest moments that we must focus to see the light." },
                    { 5, "Martin Luther King Jr.", 0, false, "In the end, we will remember not the words of our enemies, but the silence of our friends." }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Username",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "Quotes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Quotes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Quotes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Quotes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Quotes",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
