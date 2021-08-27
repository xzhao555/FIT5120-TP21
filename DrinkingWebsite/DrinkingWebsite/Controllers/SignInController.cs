using DrinkingWebsite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DrinkingWebsite.Controllers
{
    public class SignInController : Controller
    {
        DataContext db = new DataContext();
        // GET: SignIn
        /// <summary>
        /// first page of our website
        /// use to isolate people unrelated to our project
        /// </summary>
        /// <returns>sign in view</returns>
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(string Password)
        {
            var data = db.loginInfos.SqlQuery("SELECT * FROM LoginInfo").ToList();
            if (data.Count() > 0)
            {
                if (data.Where(x => x.LoginID == 1 && x.Password == Password).Count() > 0)
                {
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ViewBag.msg = "Password is invalid.";
                }
            }
            return View();
        }
    }
}