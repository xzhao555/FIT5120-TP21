using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DrinkingWebsite.Controllers
{
    public class ReasonsController : Controller
    {
        // GET: Reasons
        /// <summary>
        /// reasons why people drink page's controller
        /// </summary>
        /// <returns>reasons why people drink view</returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}