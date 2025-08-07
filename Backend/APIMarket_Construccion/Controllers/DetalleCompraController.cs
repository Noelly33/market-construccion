using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIMarket_Construccion.Controllers
{
    public class DetalleCompraController : Controller
    {
        // GET: DetalleCompra
        public ActionResult Index()
        {
            return View();
        }

        // GET: DetalleCompra/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: DetalleCompra/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: DetalleCompra/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: DetalleCompra/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: DetalleCompra/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: DetalleCompra/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: DetalleCompra/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
