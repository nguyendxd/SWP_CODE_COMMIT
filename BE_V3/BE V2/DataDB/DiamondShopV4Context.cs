using Microsoft.EntityFrameworkCore;

namespace BE_V2.DataDB
{
    public partial class DiamondShopV4Context : DbContext
    {
        public DiamondShopV4Context()
        {
        }

        public DiamondShopV4Context(DbContextOptions<DiamondShopV4Context> options)
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
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<CartItem> CartItems { get; set; }
        public virtual DbSet<Wishlist> Wishlists { get; set; }
        public virtual DbSet<WishlistItem> WishlistItems { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<EventItem> EventItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
            => optionsBuilder.UseSqlServer("Server=MSI\\SQLEXPRESS;Database=Diamond_Shop_V4;Trusted_Connection=True;TrustServerCertificate=True;");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.CustomerId).HasName("PK__Customer__A4AE64B8E2F39143");

                entity.ToTable("Customer");

                entity.HasIndex(e => e.UserId, "UQ__Customer__1788CCAD7E4B64B6").IsUnique();

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User).WithOne(p => p.Customer)
                    .HasForeignKey<Customer>(d => d.UserId)
                    .HasConstraintName("FK__Customer__UserID__571DF1D5");

                entity.HasMany(d => d.Wishlists)
                   .WithOne(p => p.Customer)
                   .HasForeignKey(d => d.CustomerId)
                   .HasConstraintName("FK__Wishlist__Custom__02FC7413");
            });

            modelBuilder.Entity<Diamond>(entity =>
            {
                entity.HasKey(e => e.DiamondId).HasName("PK__Diamond__23A8E7BBE47D50DC");

                entity.ToTable("Diamond");

                entity.Property(e => e.DiamondId).HasColumnName("DiamondID");
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
                entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDF6BA84AC5C");

                entity.ToTable("Feedback");

                entity.Property(e => e.FeedbackId).HasColumnName("FeedbackID");
                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
                entity.Property(e => e.FeedbackText).HasMaxLength(1000);

                entity.HasOne(d => d.Customer).WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Feedback__Custom__6477ECF3");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAF84671313");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");
                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
                entity.Property(e => e.TotalPrice).HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Orders__Customer__59FA5E80");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => e.OrderDetailId).HasName("PK__OrderDet__D3B9D30CF13D40EE");

                entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetailID");
                entity.Property(e => e.OrderId).HasColumnName("OrderID");
                entity.Property(e => e.ProductId).HasColumnName("ProductID");
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
                entity.HasKey(e => e.PaymentId).HasName("PK__Payment__9B556A58C7262DC1");

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
                entity.HasKey(e => e.ProductId).HasName("PK__Product__B40CC6ED5D24FBE4");

                entity.ToTable("Product");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");
                entity.Property(e => e.DiamondId).HasColumnName("DiamondID");
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

                entity.HasMany(d => d.WishlistItems)
                    .WithOne(p => p.Product)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__WishlistI__Produ__06CD04F7");
            });

            modelBuilder.Entity<ProductType>(entity =>
            {
                entity.HasKey(e => e.ProductTypeId).HasName("PK__ProductT__A1312F4E6F0C4623");

                entity.Property(e => e.ProductTypeId).HasColumnName("ProductTypeID");
                entity.Property(e => e.ProductTypeName).HasMaxLength(50);
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE3A3AEE977B");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");
                entity.Property(e => e.RoleName).HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC77FF890C");

                entity.Property(e => e.UserId).HasColumnName("UserID");
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

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasKey(e => e.CartID).HasName("PK__Cart__2F36C7C22AAEDC89");

                entity.ToTable("Cart");

                entity.Property(e => e.CartID).HasColumnName("CartID");
                entity.Property(e => e.UserID).HasColumnName("UserID");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.UserID)
                    .HasConstraintName("FK__Cart__UserID__2A4B4B5E");
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.HasKey(e => e.CartItemID).HasName("PK__CartItem__3A4CA8E7AAB53760");

                entity.ToTable("CartItem");

                entity.Property(e => e.CartItemID).HasColumnName("CartItemID");
                entity.Property(e => e.CartID).HasColumnName("CartID");
                entity.Property(e => e.ProductID).HasColumnName("ProductID");
                entity.Property(e => e.Quantity).IsRequired();
                entity.Property(e => e.Price).HasColumnType("decimal(10, 2)").IsRequired();

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.CartID)
                    .HasConstraintName("FK__CartItem__CartID__2B3F6F97");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.ProductID)
                    .HasConstraintName("FK__CartItem__Product__2C3393D0");
            });

            modelBuilder.Entity<Wishlist>(entity =>
            {
                entity.HasKey(e => e.WishlistId).HasName("PK__Wishlist__233189CB03175B66");

                entity.ToTable("Wishlist");

                entity.Property(e => e.WishlistId).HasColumnName("WishlistID");
                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.HasOne(d => d.Customer).WithMany(p => p.Wishlists)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Wishlist__Custom__02FC7413");
            });

            modelBuilder.Entity<WishlistItem>(entity =>
            {
                entity.HasKey(e => e.WishlistItemId).HasName("PK__Wishlist__171E21813C0A4C5A");

                entity.Property(e => e.WishlistItemId).HasColumnName("WishlistItemID");
                entity.Property(e => e.ProductId).HasColumnName("ProductID");
                entity.Property(e => e.WishlistId).HasColumnName("WishlistID");

                entity.HasOne(d => d.Product).WithMany(p => p.WishlistItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__WishlistI__Produ__06CD04F7");

                entity.HasOne(d => d.Wishlist).WithMany(p => p.WishlistItems)
                    .HasForeignKey(d => d.WishlistId)
                    .HasConstraintName("FK__WishlistI__Wishl__05D8E0BE");
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.HasKey(e => e.EventID).HasName("PK__Event__1E20497A");

                entity.ToTable("Event");

                entity.Property(e => e.EventID).HasColumnName("EventID");
                entity.Property(e => e.EventName).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Date).IsRequired();
                entity.Property(e => e.Description).HasMaxLength(int.MaxValue);

                entity.HasMany(e => e.EventItems)
                      .WithOne(ei => ei.Event)
                      .HasForeignKey(ei => ei.EventID)
                      .HasConstraintName("FK__EventItem__EventID__02FC7413");
            });

            modelBuilder.Entity<EventItem>(entity =>
            {
                entity.HasKey(e => e.EventItemID).HasName("PK__EventItem__1BFD2C07");

                entity.ToTable("EventItem");

                entity.Property(e => e.EventItemID).HasColumnName("EventItemID");
                entity.Property(e => e.EventID).IsRequired();
                entity.Property(e => e.ProductID).IsRequired();
                entity.Property(e => e.Date).IsRequired();
                entity.Property(e => e.Discount).HasColumnType("decimal(5, 2)").IsRequired();

                entity.HasOne(ei => ei.Event)
                      .WithMany(e => e.EventItems)
                      .HasForeignKey(ei => ei.EventID)
                      .HasConstraintName("FK__EventItem__EventID__02FC7413");

                entity.HasOne(ei => ei.Product)
                      .WithMany(p => p.EventItems)
                      .HasForeignKey(ei => ei.ProductID)
                      .HasConstraintName("FK__EventItem__ProductID__02FC7413");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
