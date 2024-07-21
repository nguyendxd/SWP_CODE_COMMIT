using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Test.DataDB;

public partial class DiamondShopV1Context : DbContext
{
    public DiamondShopV1Context()
    {
    }

    public DiamondShopV1Context(DbContextOptions<DiamondShopV1Context> options)
        : base(options)
    {
    }

    public virtual DbSet<ContactSupport> ContactSupports { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<DesignSpace> DesignSpaces { get; set; }

    public virtual DbSet<Designer> Designers { get; set; }

    public virtual DbSet<Diamond> Diamonds { get; set; }

    public virtual DbSet<EducationalContent> EducationalContents { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<Jewelry> Jewelries { get; set; }

    public virtual DbSet<Manager> Managers { get; set; }

    public virtual DbSet<Necklace> Necklaces { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Ring> Rings { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Staff> Staff { get; set; }

    public virtual DbSet<Tracklog> Tracklogs { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-FJU9TV47\\SQLEXPRESS;Database=Diamond_Shop_V1;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactSupport>(entity =>
        {
            entity.HasKey(e => e.GuestId).HasName("PK__ContactS__0C423C32256A76A2");

            entity.ToTable("ContactSupport");

            entity.Property(e => e.GuestId)
                .ValueGeneratedNever()
                .HasColumnName("GuestID");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SalesStaffId).HasColumnName("SalesStaffID");

            entity.HasOne(d => d.SalesStaff).WithMany(p => p.ContactSupports)
                .HasForeignKey(d => d.SalesStaffId)
                .HasConstraintName("FK__ContactSu__Sales__09A971A2");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__Customer__A4AE64B8337511C3");

            entity.ToTable("Customer");

            entity.Property(e => e.CustomerId)
                .ValueGeneratedNever()
                .HasColumnName("CustomerID");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Sex)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Customers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Customer__UserID__5070F446");
        });

        modelBuilder.Entity<DesignSpace>(entity =>
        {
            entity.HasKey(e => e.DesignId).HasName("PK__DesignSp__32B8E17F15B21588");

            entity.ToTable("DesignSpace");

            entity.Property(e => e.DesignId)
                .ValueGeneratedNever()
                .HasColumnName("DesignID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.DesignerId).HasColumnName("DesignerID");
            entity.Property(e => e.TracklogId).HasColumnName("TracklogID");

            entity.HasOne(d => d.Customer).WithMany(p => p.DesignSpaces)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__DesignSpa__Custo__7E37BEF6");

            entity.HasOne(d => d.Designer).WithMany(p => p.DesignSpaces)
                .HasForeignKey(d => d.DesignerId)
                .HasConstraintName("FK__DesignSpa__Desig__7C4F7684");

            entity.HasOne(d => d.Tracklog).WithMany(p => p.DesignSpaces)
                .HasForeignKey(d => d.TracklogId)
                .HasConstraintName("FK__DesignSpa__Track__7D439ABD");
        });

        modelBuilder.Entity<Designer>(entity =>
        {
            entity.HasKey(e => e.DesignerId).HasName("PK__Designer__45F52A3897C7FD74");

            entity.ToTable("Designer");

            entity.Property(e => e.DesignerId)
                .ValueGeneratedNever()
                .HasColumnName("DesignerID");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DesignId).HasColumnName("DesignID");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Designers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Designer__UserID__534D60F1");
        });

        modelBuilder.Entity<Diamond>(entity =>
        {
            entity.HasKey(e => e.DiamondId).HasName("PK__Diamond__23A8E7BB9AB43987");

            entity.ToTable("Diamond");

            entity.Property(e => e.DiamondId)
                .ValueGeneratedNever()
                .HasColumnName("DiamondID");
            entity.Property(e => e.Certificate)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Clarity)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Color)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Cut)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Fluorescence)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Girdle)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Measurements)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Shape)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Symmetry)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EducationalContent>(entity =>
        {
            entity.HasKey(e => e.DesignId).HasName("PK__Educatio__32B8E17F9B67B715");

            entity.ToTable("EducationalContent");

            entity.Property(e => e.DesignId)
                .ValueGeneratedNever()
                .HasColumnName("DesignID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.DesignerId).HasColumnName("DesignerID");
            entity.Property(e => e.TracklogId).HasColumnName("TracklogID");

            entity.HasOne(d => d.Customer).WithMany(p => p.EducationalContents)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Education__Custo__06CD04F7");

            entity.HasOne(d => d.Designer).WithMany(p => p.EducationalContents)
                .HasForeignKey(d => d.DesignerId)
                .HasConstraintName("FK__Education__Desig__04E4BC85");

            entity.HasOne(d => d.Tracklog).WithMany(p => p.EducationalContents)
                .HasForeignKey(d => d.TracklogId)
                .HasConstraintName("FK__Education__Track__05D8E0BE");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDF662B0F225");

            entity.ToTable("Feedback");

            entity.Property(e => e.FeedbackId)
                .ValueGeneratedNever()
                .HasColumnName("FeedbackID");
            entity.Property(e => e.Comment)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.InvoiceId).HasColumnName("InvoiceID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Invoice).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.InvoiceId)
                .HasConstraintName("FK__Feedback__Invoic__02084FDA");

            entity.HasOne(d => d.User).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Feedback__UserID__01142BA1");
        });

        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.HasKey(e => e.InvoiceId).HasName("PK__Invoice__D796AAD5461FCB8B");

            entity.ToTable("Invoice");

            entity.Property(e => e.InvoiceId)
                .ValueGeneratedNever()
                .HasColumnName("InvoiceID");
            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.Products)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Payment).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.PaymentId)
                .HasConstraintName("FK__Invoice__Payment__68487DD7");
        });

        modelBuilder.Entity<Jewelry>(entity =>
        {
            entity.HasKey(e => e.JewelryId).HasName("PK__Jewelry__807031F5FAB98007");

            entity.ToTable("Jewelry");

            entity.Property(e => e.JewelryId)
                .ValueGeneratedNever()
                .HasColumnName("JewelryID");
        });

        modelBuilder.Entity<Manager>(entity =>
        {
            entity.HasKey(e => e.ManagerId).HasName("PK__Manager__3BA2AA81760BF5E4");

            entity.ToTable("Manager");

            entity.Property(e => e.ManagerId)
                .ValueGeneratedNever()
                .HasColumnName("ManagerID");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Product).WithMany(p => p.Managers)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__Manager__Product__6FE99F9F");

            entity.HasOne(d => d.User).WithMany(p => p.Managers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Manager__UserID__6EF57B66");
        });

        modelBuilder.Entity<Necklace>(entity =>
        {
            entity.HasKey(e => e.NecklacesId).HasName("PK__Necklace__094D2E473C1E6F9C");

            entity.Property(e => e.NecklacesId)
                .ValueGeneratedNever()
                .HasColumnName("NecklacesID");
            entity.Property(e => e.ChainType)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Clarity)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ClaspType)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Color)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EnhancementType)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.JewelryId).HasColumnName("JewelryID");
            entity.Property(e => e.NecklacesName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Shape)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Jewelry).WithMany(p => p.Necklaces)
                .HasForeignKey(d => d.JewelryId)
                .HasConstraintName("FK__Necklaces__Jewel__75A278F5");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAF9F99804A");

            entity.Property(e => e.OrderId)
                .ValueGeneratedNever()
                .HasColumnName("OrderID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetailID");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Orders__Customer__5DCAEF64");

            entity.HasOne(d => d.OrderDetail).WithMany(p => p.Orders)
                .HasForeignKey(d => d.OrderDetailId)
                .HasConstraintName("FK__Orders__OrderDet__628FA481");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__OrderDet__D3B9D30C374C643B");

            entity.ToTable("OrderDetail");

            entity.Property(e => e.OrderDetailId)
                .ValueGeneratedNever()
                .HasColumnName("OrderDetailID");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__OrderDeta__Order__60A75C0F");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__OrderDeta__Produ__619B8048");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payment__9B556A58FBCFD53F");

            entity.ToTable("Payment");

            entity.Property(e => e.PaymentId)
                .ValueGeneratedNever()
                .HasColumnName("PaymentID");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Payment__OrderID__656C112C");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Product__B40CC6ED8D30C96C");

            entity.ToTable("Product");

            entity.Property(e => e.ProductId)
                .ValueGeneratedNever()
                .HasColumnName("ProductID");
            entity.Property(e => e.DesignId).HasColumnName("DesignID");
            entity.Property(e => e.DesignerId).HasColumnName("DesignerID");
            entity.Property(e => e.DiamondId).HasColumnName("DiamondID");
            entity.Property(e => e.JewelryId).HasColumnName("JewelryID");

            entity.HasOne(d => d.Design).WithMany(p => p.ProductDesigns)
                .HasForeignKey(d => d.DesignId)
                .HasConstraintName("FK__Product__DesignI__5812160E");

            entity.HasOne(d => d.Designer).WithMany(p => p.ProductDesigners)
                .HasForeignKey(d => d.DesignerId)
                .HasConstraintName("FK__Product__Designe__5AEE82B9");

            entity.HasOne(d => d.Diamond).WithMany(p => p.Products)
                .HasForeignKey(d => d.DiamondId)
                .HasConstraintName("FK__Product__Diamond__59FA5E80");

            entity.HasOne(d => d.Jewelry).WithMany(p => p.Products)
                .HasForeignKey(d => d.JewelryId)
                .HasConstraintName("FK__Product__Jewelry__59063A47");
        });

        modelBuilder.Entity<Ring>(entity =>
        {
            entity.HasKey(e => e.RingId).HasName("PK__Ring__F1D5904A0E6F83B0");

            entity.ToTable("Ring");

            entity.Property(e => e.RingId)
                .ValueGeneratedNever()
                .HasColumnName("RingID");
            entity.Property(e => e.Clarity)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Color)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.JewelryId).HasColumnName("JewelryID");
            entity.Property(e => e.RingName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Shape)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Jewelry).WithMany(p => p.Rings)
                .HasForeignKey(d => d.JewelryId)
                .HasConstraintName("FK__Ring__JewelryID__72C60C4A");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__8AFACE3A872C4D38");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId)
                .ValueGeneratedNever()
                .HasColumnName("RoleID");
            entity.Property(e => e.RoleName)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Staff>(entity =>
        {
            entity.HasKey(e => e.SalesStaffId).HasName("PK__Staff__468D8DFDE83B5159");

            entity.Property(e => e.SalesStaffId)
                .ValueGeneratedNever()
                .HasColumnName("SalesStaffID");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Order).WithMany(p => p.Staff)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Staff__OrderID__6B24EA82");

            entity.HasOne(d => d.User).WithMany(p => p.Staff)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Staff__UserID__6C190EBB");
        });

        modelBuilder.Entity<Tracklog>(entity =>
        {
            entity.HasKey(e => e.TracklogId).HasName("PK__Tracklog__94232C63AB137A04");

            entity.ToTable("Tracklog");

            entity.Property(e => e.TracklogId)
                .ValueGeneratedNever()
                .HasColumnName("TracklogID");
            entity.Property(e => e.DesignId).HasColumnName("DesignID");
            entity.Property(e => e.DesignerId).HasColumnName("DesignerID");
            entity.Property(e => e.Picture)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Design).WithMany(p => p.TracklogDesigns)
                .HasForeignKey(d => d.DesignId)
                .HasConstraintName("FK__Tracklog__Design__787EE5A0");

            entity.HasOne(d => d.Designer).WithMany(p => p.TracklogDesigners)
                .HasForeignKey(d => d.DesignerId)
                .HasConstraintName("FK__Tracklog__Design__797309D9");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC7A471B2B");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("UserID");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__Users__RoleID__4D94879B");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
