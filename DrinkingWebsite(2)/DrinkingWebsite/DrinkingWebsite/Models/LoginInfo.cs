using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DrinkingWebsite.Models
{
    [Table("LoginInfo")]
    public class LoginInfo
    {
        [Key]
        public int LoginID { get; set; }
        public string Password { get; set; }
    }
}