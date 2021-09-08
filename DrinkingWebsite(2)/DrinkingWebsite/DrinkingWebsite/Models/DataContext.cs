using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;


namespace DrinkingWebsite.Models
{
    public class DataContext : DbContext
    {
        public DataContext() : base("conn") { }
        public DbSet<LoginInfo> loginInfos { get; set; }
    }
}