using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace gocodelab.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CadastroPaciente()
        {
            return View();
        }

        public ActionResult Vacinacao()
        {
            return View();
        }
    }
}