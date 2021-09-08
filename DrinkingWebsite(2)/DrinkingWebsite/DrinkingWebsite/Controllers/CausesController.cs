using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DrinkingWebsite.Controllers
{
    public class CausesController : Controller
    {
        // GET: Causes
        /// <summary>
        /// cause and risk factor page's controller
        /// </summary>
        /// <returns>cause and risk factor view</returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}