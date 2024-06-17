using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SWP_SU4.DataDB;

public partial class DiamondShopContext : DbContext
{
    public DiamondShopContext()
    {
    }

    public DiamondShopContext(DbContextOptions<DiamondShopContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }
   
    public virtual DbSet<Diamond> Diamonds { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductType> ProductTypes { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=MSI\\SQLEXPRESS;Database=DiamondShop;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__Customer__A4AE64B8746740E2");

            entity.ToTable("Customer");

            entity.HasIndex(e => e.UserId, "UQ__Customer__1788CCADADB9135E").IsUnique();

            entity.Property(e => e.CustomerId).HasColumnName("CustomerID").ValueGeneratedOnAdd();
            entity.Property(e => e.UserId).HasColumnName("UserID").ValueGeneratedOnAdd();

            entity.HasOne(d => d.User).WithOne(p => p.Customer)
                .HasForeignKey<Customer>(d => d.UserId)
                .HasConstraintName("FK__Customer__UserID__571DF1D5");
        });

        modelBuilder.Entity<Diamond>(entity =>
        {
            entity.HasKey(e => e.DiamondId).HasName("PK__Diamond__23A8E7BB231D770B");

            entity.ToTable("Diamond");

            entity.Property(e => e.DiamondId).HasColumnName("DiamondID").ValueGeneratedOnAdd();
            entity.Property(e => e.CaratWeight).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Certificate).HasMaxLength(255);
            entity.Property(e => e.Clarity).HasMaxLength(50);
            entity.Property(e => e.Color).HasMaxLength(50);
            entity.Property(e => e.Cut).HasMaxLength(50);
            entity.Property(e => e.Depth).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Fluorescence).HasMaxLength(50);
            entity.Property(e => e.Girdle).HasMaxLength(50);
            entity.Property(e => e.LengthWidthRatio).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Measurements).HasMaxLength(255);
            entity.Property(e => e.Shape).HasMaxLength(50);
            entity.Property(e => e.Symmetry).HasMaxLength(50);
            entity.Property(e => e.Tables).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDF62C0E9C89");

            entity.ToTable("Feedback");

            entity.Property(e => e.FeedbackId).HasColumnName("FeedbackID").ValueGeneratedOnAdd();
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID").ValueGeneratedOnAdd();
            entity.Property(e => e.FeedbackText).HasMaxLength(1000);

            entity.HasOne(d => d.Customer).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Feedback__Custom__6477ECF3");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAF34DAA711");

            entity.Property(e => e.OrderId).HasColumnName("OrderID").ValueGeneratedOnAdd();
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID").ValueGeneratedOnAdd();
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Orders__Customer__59FA5E80");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__OrderDet__D3B9D30C60EC2AE1");

            entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetailID").ValueGeneratedOnAdd();
            entity.Property(e => e.OrderId).HasColumnName("OrderID").ValueGeneratedOnAdd();
            entity.Property(e => e.ProductId).HasColumnName("ProductID").ValueGeneratedOnAdd();
            entity.Property(e => e.ProductName).HasMaxLength(255);
            entity.Property(e => e.ProductPrice).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__OrderDeta__Order__5CD6CB2B");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__OrderDeta__Produ__5DCAEF64");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payment__9B556A580FE3D5D8");

            entity.ToTable("Payment");

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.AmountPaid).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Deposit).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.Total).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Payment__OrderID__60A75C0F");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Product__B40CC6EDB15BCB3C");

            entity.ToTable("Product");

            entity.Property(e => e.ProductId).HasColumnName("ProductID").ValueGeneratedOnAdd();
            entity.Property(e => e.DiamondId).HasColumnName("DiamondID").ValueGeneratedOnAdd();
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.ProductName).HasMaxLength(255);
            entity.Property(e => e.Size).HasMaxLength(50);
            entity.Property(e => e.Type).HasMaxLength(50);

            entity.HasOne(d => d.Diamond).WithMany(p => p.Products)
                .HasForeignKey(d => d.DiamondId)
                .HasConstraintName("FK__Product__Diamond__534D60F1");

            entity.HasOne(d => d.ProductTypeNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.ProductType)
                .HasConstraintName("FK__Product__Product__52593CB8");
        });

        modelBuilder.Entity<ProductType>(entity =>
        {
            entity.HasKey(e => e.ProductTypeId).HasName("PK__ProductT__A1312F4E510F4572");

            entity.Property(e => e.ProductTypeId).HasColumnName("ProductTypeID").ValueGeneratedOnAdd();
            entity.Property(e => e.ProductTypeName).HasMaxLength(50);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE3A28A3BF91");

            entity.Property(e => e.RoleId).HasColumnName("RoleID").ValueGeneratedOnAdd();
            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCACA9F27A1D");

            entity.Property(e => e.UserId).HasColumnName("UserID").ValueGeneratedOnAdd();
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.Sex).HasMaxLength(5);
            entity.Property(e => e.Username).HasMaxLength(50);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__Users__RoleID__4BAC3F29");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
