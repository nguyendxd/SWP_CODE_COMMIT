using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE_V2.DataDB
{
    public partial class Product
    {
        public Product()
        {
            OrderDetails = new HashSet<OrderDetail>();
            CartItems = new HashSet<CartItem>();
            WishlistItems = new HashSet<WishlistItem>();
            EventItems = new HashSet<EventItem>();
            PriceDetails = new HashSet<PriceDetail>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }

        public string? ProductName { get; set; }

        public int? ProductType { get; set; }

        public string? Type { get; set; }

        public string? Size { get; set; }

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int? Quantity { get; set; }

        public int? DiamondId { get; set; }

        public string? Image1 { get; set; }

        public string? Image2 { get; set; }

        public string? Image3 { get; set; }

        public virtual Diamond? Diamond { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

        public virtual ProductType? ProductTypeNavigation { get; set; }

        public virtual ICollection<CartItem> CartItems { get; set; }

        public virtual ICollection<WishlistItem> WishlistItems { get; set; }

        public virtual ICollection<EventItem> EventItems { get; set; }

        public virtual ICollection<PriceDetail> PriceDetails { get; set; }
    }
}
