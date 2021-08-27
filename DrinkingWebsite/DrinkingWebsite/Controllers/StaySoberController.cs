using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DrinkingWebsite.Controllers
{
    public class StaySoberController : Controller
    {
        // GET: StaySober
        /// <summary>
        /// stay sober's controller
        /// </summary>
        /// <returns>stay sober view</returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}