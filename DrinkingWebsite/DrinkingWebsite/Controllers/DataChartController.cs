using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DrinkingWebsite.Controllers
{
    public class DataChartController : Controller
    {
        // GET: DataChart
        /// <summary>
        /// drinking factsheet page's controller
        /// </summary>
        /// <returns>drinking factsheet view</returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}