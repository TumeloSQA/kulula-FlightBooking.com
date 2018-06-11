using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class InternetPaymentSIDsController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/InternetPaymentSIDs
        [AllowAnonymous]
        public IQueryable<InternetPaymentSID> GetInternetPaymentSIDs()
        {
            return db.InternetPaymentSIDs;
        }

        // GET: api/InternetPaymentSIDs/5
       /* [ResponseType(typeof(InternetPaymentSID))]
        public IHttpActionResult GetInternetPaymentSID(int id)
        {
            InternetPaymentSID internetPaymentSID = db.InternetPaymentSIDs.Find(id);
            if (internetPaymentSID == null)
            {
                return NotFound();
            }

            return Ok(internetPaymentSID);
        }*/

        // PUT: api/InternetPaymentSIDs/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInternetPaymentSID(int id, InternetPaymentSID internetPaymentSID)
        {
          /*  if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }*/

            if (id != internetPaymentSID.InternetPaymentID)
            {
                return BadRequest();
            }

            db.Entry(internetPaymentSID).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InternetPaymentSIDExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/InternetPaymentSIDs
        [AllowAnonymous]
        [ResponseType(typeof(InternetPaymentSID))]
        public IHttpActionResult PostInternetPaymentSID(InternetPaymentSID internetPaymentSID)
        {
           /* if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }*/

            db.InternetPaymentSIDs.Add(internetPaymentSID);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = internetPaymentSID.InternetPaymentID }, internetPaymentSID);
        }

        // DELETE: api/InternetPaymentSIDs/5
        [AllowAnonymous]
        [ResponseType(typeof(InternetPaymentSID))]
        public IHttpActionResult DeleteInternetPaymentSID(int id)
        {
            InternetPaymentSID internetPaymentSID = db.InternetPaymentSIDs.Find(id);
            if (internetPaymentSID == null)
            {
                return NotFound();
            }

            db.InternetPaymentSIDs.Remove(internetPaymentSID);
            db.SaveChanges();

            return Ok(internetPaymentSID);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool InternetPaymentSIDExists(int id)
        {
            return db.InternetPaymentSIDs.Count(e => e.InternetPaymentID == id) > 0;
        }
    }
}