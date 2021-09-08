using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DrinkingWebsite.Controllers
{
    public class BingeDrinkingController : Controller
    {
        // GET: BingeDrinking
        /// <summary>
        /// BingeDrinking page's controller
        /// </summary>
        /// <returns>BingeDrinking view</returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}