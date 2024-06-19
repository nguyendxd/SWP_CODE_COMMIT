﻿// <auto-generated />
using System;
using BE_V2.DataDB;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BE_V2.Migrations
{
    [DbContext(typeof(DiamondShopV4Context))]
    [Migration("20240618005802_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BE_V2.DataDB.Cart", b =>
                {
                    b.Property<int>("CartID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CartID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CartID"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GETDATE()");

                    b.Property<int>("UserID")
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    b.HasKey("CartID")
                        .HasName("PK__Cart__2F36C7C22AAEDC89");

                    b.HasIndex("UserID");

                    b.ToTable("Cart", (string)null);
                });

            modelBuilder.Entity("BE_V2.DataDB.CartItem", b =>
                {
                    b.Property<int>("CartItemID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CartItemID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CartItemID"));

                    b.Property<int>("CartID")
                        .HasColumnType("int")
                        .HasColumnName("CartID");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<int>("ProductID")
                        .HasColumnType("int")
                        .HasColumnName("ProductID");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("CartItemID")
                        .HasName("PK__CartItem__3A4CA8E7AAB53760");

                    b.HasIndex("CartID");

                    b.HasIndex("ProductID");

                    b.ToTable("CartItem", (string)null);
                });

            modelBuilder.Entity("BE_V2.DataDB.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CustomerID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CustomerId"));

                    b.Property<DateOnly>("DateJoined")
                        .HasColumnType("date");

                    b.Property<int?>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    b.HasKey("CustomerId")
                        .HasName("PK__Customer__A4AE64B8E2F39143");

                    b.HasIndex(new[] { "UserId" }, "UQ__Customer__1788CCAD7E4B64B6")
                        .IsUnique()
                        .HasFilter("[UserID] IS NOT NULL");

                    b.ToTable("Customer", (string)null);
                });

            modelBuilder.Entity("BE_V2.DataDB.Diamond", b =>
                {
                    b.Property<int>("DiamondId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("DiamondID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DiamondId"));

                    b.Property<decimal?>("CaratWeight")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<string>("Certificate")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Clarity")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Color")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Cut")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<decimal?>("Depth")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<string>("Fluorescence")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Girdle")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<decimal?>("LengthWidthRatio")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<string>("Measurements")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Shape")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Symmetry")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<decimal?>("Tables")
                        .HasColumnType("decimal(10, 2)");

                    b.HasKey("DiamondId")
                        .HasName("PK__Diamond__23A8E7BBE47D50DC");

                    b.ToTable("Diamond", (string)null);
                });

            modelBuilder.Entity("BE_V2.DataDB.Feedback", b =>
                {
                    b.Property<int>("FeedbackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("FeedbackID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FeedbackId"));

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int")
                        .HasColumnName("CustomerID");

                    b.Property<DateOnly?>("FeedbackDate")
                        .HasColumnType("date");

                    b.Property<string>("FeedbackText")
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<int?>("Rating")
                        .HasColumnType("int");

                    b.HasKey("FeedbackId")
                        .HasName("PK__Feedback__6A4BEDF6BA84AC5C");

                    b.HasIndex("CustomerId");

                    b.ToTable("Feedback", (string)null);
                });

            modelBuilder.Entity("BE_V2.DataDB.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("OrderID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrderId"));

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int")
                        .HasColumnName("CustomerID");

                    b.Property<DateOnly?>("OrderDate")
                        .HasColumnType("date");

                    b.Property<decimal?>("TotalPrice")
                        .HasColumnType("decimal(10, 2)");

                    b.HasKey("OrderId")
                        .HasName("PK__Orders__C3905BAF84671313");

                    b.HasIndex("CustomerId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("BE_V2.DataDB.OrderDetail", b =>
                {
                    b.Property<int>("OrderDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("OrderDetailID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrderDetailId"));

                    b.Property<int?>("OrderId")
                        .HasColumnType("int")
                        .HasColumnName("OrderID");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int")
                        .HasColumnName("ProductID");

                    b.Property<string>("ProductName")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<decimal?>("ProductPrice")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("OrderDetailId")
                        .HasName("PK__OrderDet__D3B9D30CF13D40EE");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderDetails");
                });

            modelBuilder.Entity("BE_V2.DataDB.Payment", b =>
                {
                    b.Property<int>("PaymentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("PaymentID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PaymentId"));

                    b.Property<decimal?>("AmountPaid")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<DateOnly?>("DatePaid")
                        .HasColumnType("date");

                    b.Property<decimal?>("Deposit")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<int?>("OrderId")
                        .HasColumnType("int")
                        .HasColumnName("OrderID");

                    b.Property<decimal?>("Total")
                        .HasColumnType("decimal(10, 2)");

                    b.HasKey("PaymentId")
                        .HasName("PK__Payment__9B556A58C7262DC1");

                    b.HasIndex("OrderId");

                    b.ToTable("Payment", (string)null);
                });

            modelBuilder.Entity("BE_V2.DataDB.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ProductID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProductId"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DiamondId")
                        .HasColumnType("int")
                        .HasColumnName("DiamondID");

                    b.Property<string>("Image1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("Price")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<string>("ProductName")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("ProductType")
                        .HasColumnType("int");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("Size")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Type")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ProductId")
                        .HasName("PK__Product__B40CC6ED5D24FBE4");

                    b.HasIndex("DiamondId");

                    b.HasIndex("ProductType");

                    b.ToTable("Product", (string)null);
                });

            modelBuilder.Entity("BE_V2.DataDB.ProductType", b =>
                {
                    b.Property<int>("ProductTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ProductTypeID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProductTypeId"));

                    b.Property<string>("ProductTypeName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ProductTypeId")
                        .HasName("PK__ProductT__A1312F4E6F0C4623");

                    b.ToTable("ProductTypes");
                });

            modelBuilder.Entity("BE_V2.DataDB.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("RoleID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoleId"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("RoleId")
                        .HasName("PK__Roles__8AFACE3A3AEE977B");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("BE_V2.DataDB.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Address")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int?>("RoleId")
                        .HasColumnType("int")
                        .HasColumnName("RoleID");

                    b.Property<string>("Sex")
                        .HasMaxLength(5)
                        .HasColumnType("nvarchar(5)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("UserId")
                        .HasName("PK__Users__1788CCAC77FF890C");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BE_V2.DataDB.Wishlist", b =>
                {
                    b.Property<int>("WishlistId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("WishlistID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WishlistId"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CustomerId")
                        .HasColumnType("int")
                        .HasColumnName("CustomerID");

                    b.HasKey("WishlistId")
                        .HasName("PK__Wishlist__233189CB03175B66");

                    b.HasIndex("CustomerId");

                    b.ToTable("Wishlist", (string)null);
                });

            modelBuilder.Entity("BE_V2.DataDB.WishlistItem", b =>
                {
                    b.Property<int>("WishlistItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("WishlistItemID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WishlistItemId"));

                    b.Property<DateTime>("AddedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("ProductId")
                        .HasColumnType("int")
                        .HasColumnName("ProductID");

                    b.Property<int>("WishlistId")
                        .HasColumnType("int")
                        .HasColumnName("WishlistID");

                    b.Property<int?>("WishlistItemId1")
                        .HasColumnType("int");

                    b.HasKey("WishlistItemId")
                        .HasName("PK__Wishlist__171E21813C0A4C5A");

                    b.HasIndex("ProductId");

                    b.HasIndex("WishlistId");

                    b.HasIndex("WishlistItemId1");

                    b.ToTable("WishlistItems");
                });

            modelBuilder.Entity("BE_V2.DataDB.Cart", b =>
                {
                    b.HasOne("BE_V2.DataDB.User", "User")
                        .WithMany("Carts")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__Cart__UserID__2A4B4B5E");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE_V2.DataDB.CartItem", b =>
                {
                    b.HasOne("BE_V2.DataDB.Cart", "Cart")
                        .WithMany("CartItems")
                        .HasForeignKey("CartID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__CartItem__CartID__2B3F6F97");

                    b.HasOne("BE_V2.DataDB.Product", "Product")
                        .WithMany("CartItems")
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__CartItem__Product__2C3393D0");

                    b.Navigation("Cart");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("BE_V2.DataDB.Customer", b =>
                {
                    b.HasOne("BE_V2.DataDB.User", "User")
                        .WithOne("Customer")
                        .HasForeignKey("BE_V2.DataDB.Customer", "UserId")
                        .HasConstraintName("FK__Customer__UserID__571DF1D5");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE_V2.DataDB.Feedback", b =>
                {
                    b.HasOne("BE_V2.DataDB.Customer", "Customer")
                        .WithMany("Feedbacks")
                        .HasForeignKey("CustomerId")
                        .HasConstraintName("FK__Feedback__Custom__6477ECF3");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("BE_V2.DataDB.Order", b =>
                {
                    b.HasOne("BE_V2.DataDB.Customer", "Customer")
                        .WithMany("Orders")
                        .HasForeignKey("CustomerId")
                        .HasConstraintName("FK__Orders__Customer__59FA5E80");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("BE_V2.DataDB.OrderDetail", b =>
                {
                    b.HasOne("BE_V2.DataDB.Order", "Order")
                        .WithMany("OrderDetails")
                        .HasForeignKey("OrderId")
                        .HasConstraintName("FK__OrderDeta__Order__5CD6CB2B");

                    b.HasOne("BE_V2.DataDB.Product", "Product")
                        .WithMany("OrderDetails")
                        .HasForeignKey("ProductId")
                        .HasConstraintName("FK__OrderDeta__Produ__5DCAEF64");

                    b.Navigation("Order");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("BE_V2.DataDB.Payment", b =>
                {
                    b.HasOne("BE_V2.DataDB.Order", "Order")
                        .WithMany("Payments")
                        .HasForeignKey("OrderId")
                        .HasConstraintName("FK__Payment__OrderID__60A75C0F");

                    b.Navigation("Order");
                });

            modelBuilder.Entity("BE_V2.DataDB.Product", b =>
                {
                    b.HasOne("BE_V2.DataDB.Diamond", "Diamond")
                        .WithMany("Products")
                        .HasForeignKey("DiamondId")
                        .HasConstraintName("FK__Product__Diamond__534D60F1");

                    b.HasOne("BE_V2.DataDB.ProductType", "ProductTypeNavigation")
                        .WithMany("Products")
                        .HasForeignKey("ProductType")
                        .HasConstraintName("FK__Product__Product__52593CB8");

                    b.Navigation("Diamond");

                    b.Navigation("ProductTypeNavigation");
                });

            modelBuilder.Entity("BE_V2.DataDB.User", b =>
                {
                    b.HasOne("BE_V2.DataDB.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .HasConstraintName("FK__Users__RoleID__4BAC3F29");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("BE_V2.DataDB.Wishlist", b =>
                {
                    b.HasOne("BE_V2.DataDB.Customer", "Customer")
                        .WithMany("Wishlists")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__Wishlist__Custom__02FC7413");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("BE_V2.DataDB.WishlistItem", b =>
                {
                    b.HasOne("BE_V2.DataDB.Product", "Product")
                        .WithMany("WishlistItems")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__WishlistI__Produ__06CD04F7");

                    b.HasOne("BE_V2.DataDB.Wishlist", "Wishlist")
                        .WithMany("WishlistItems")
                        .HasForeignKey("WishlistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__WishlistI__Wishl__05D8E0BE");

                    b.HasOne("BE_V2.DataDB.WishlistItem", null)
                        .WithMany("WishlistItems")
                        .HasForeignKey("WishlistItemId1");

                    b.Navigation("Product");

                    b.Navigation("Wishlist");
                });

            modelBuilder.Entity("BE_V2.DataDB.Cart", b =>
                {
                    b.Navigation("CartItems");
                });

            modelBuilder.Entity("BE_V2.DataDB.Customer", b =>
                {
                    b.Navigation("Feedbacks");

                    b.Navigation("Orders");

                    b.Navigation("Wishlists");
                });

            modelBuilder.Entity("BE_V2.DataDB.Diamond", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("BE_V2.DataDB.Order", b =>
                {
                    b.Navigation("OrderDetails");

                    b.Navigation("Payments");
                });

            modelBuilder.Entity("BE_V2.DataDB.Product", b =>
                {
                    b.Navigation("CartItems");

                    b.Navigation("OrderDetails");

                    b.Navigation("WishlistItems");
                });

            modelBuilder.Entity("BE_V2.DataDB.ProductType", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("BE_V2.DataDB.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("BE_V2.DataDB.User", b =>
                {
                    b.Navigation("Carts");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("BE_V2.DataDB.Wishlist", b =>
                {
                    b.Navigation("WishlistItems");
                });

            modelBuilder.Entity("BE_V2.DataDB.WishlistItem", b =>
                {
                    b.Navigation("WishlistItems");
                });
#pragma warning restore 612, 618
        }
    }
}
