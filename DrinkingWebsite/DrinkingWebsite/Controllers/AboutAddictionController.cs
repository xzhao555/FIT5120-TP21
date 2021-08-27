using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DrinkingWebsite.Controllers
{
    public class AboutAddictionController : Controller
    {
        // GET: AboutAddiction
        /// <summary>
        /// Alcoholism page's controller
        /// </summary>
        /// <returns>Alcoholism view</returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}