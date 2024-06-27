using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BE_V2.DataDB;

public class EventService
{
    private readonly DiamondShopV4Context _context;

    public EventService (DiamondShopV4Context context)
    {
        _context = context;
    }

    public async Task CleanupExpiredEvents()
    {
        // xoa cac item het han sale
        var expiredEventItems = await _context.EventItems
            .Where(ei => ei.Date < DateTime.UtcNow) //Lọc các san pham het han trong evenitems
            .ToListAsync();
        foreach (var eventItem in expiredEventItems)
        {
            //tim san pham tuong ung voi muc su kien
            var product = await _context.Products.FindAsync(eventItem.ProductID);
            if (product != null)
            {
                //khoi phuc lai gia goc cua san pham
                product.Price = product.Price / (1 - (eventItem.Discount / 100)); //cong thuc tra lai gia ban dau
                _context.Entry(product).State = EntityState.Modified; //sửa lại product
            }
            //xoa
            _context.EventItems.Remove(eventItem);
        }

        var expiredEvents = await _context.Events
            .Where(e => e.Date < DateTime.UtcNow) //loc event het han
            .Include(e => e.EventItems) //bao gom event item do eventitem nam ben trong event 
            .ToListAsync();
        foreach ( var @event in expiredEvents)
        {
            _context.Events.Remove(@event);

        }
        await _context.SaveChangesAsync();
    }


}

