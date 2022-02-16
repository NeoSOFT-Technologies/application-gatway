﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationGateway.Persistence.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transformers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TemplateName = table.Column<string>(type: "text", nullable: false),
                    TransformerTemplate = table.Column<string>(type: "text", nullable: false),
                    Gateway = table.Column<string>(type: "text", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true),
                    LastModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transformers", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Transformers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Gateway", "LastModifiedBy", "LastModifiedDate", "TemplateName", "TransformerTemplate" },
                values: new object[] { new Guid("b0788d2f-8003-43c1-92a4-edc76a7c5dde"), null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "TykGateway", null, null, "CreateApi", "{\n  \"name\": \"#valueof(Name)\",\n  \"use_keyless\": true,\n  \"active\": true,\n  \"proxy\": {\n    \"listen_path\": \"#valueof(ListenPath)\",\n    \"target_url\": \"#valueof(TargetUrl)\",\n    \"strip_listen_path\": true\n  },\n  \"version_data\": {\n    \"not_versioned\": true,\n    \"default_version\": \"Default\",\n    \"versions\": {\n      \"Default\": {\n        \"name\": \"Default\",\n        \"use_extended_paths\": true\n      }\n    }\n  }\n}" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transformers");
        }
    }
}
