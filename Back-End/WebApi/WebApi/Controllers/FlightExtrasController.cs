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
    public class FlightExtrasController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/FlightExtras
        [AllowAnonymous]
        public IQueryable<Object> GetFlightExtras()
        {
            var FlightExtra = db.FlightExtras.Select(x => new { x.ExtraID, x.FlightextraType, x.Price, x.Quantity, x.TotalPrice });
            return FlightExtra;
        }

        // GET: api/FlightExtras/5
        [AllowAnonymous]
        [ResponseType(typeof(FlightExtra))]
        public IHttpActionResult GetFlightExtra(int id)
        {
            FlightExtra flightExtra = db.FlightExtras.Find(id);
            if (flightExtra == null)
            {
                return NotFound();
            }

            return Ok(flightExtra);
        }

        // PUT: api/FlightExtras/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFlightExtra(int id, FlightExtra flightExtra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != flightExtra.ExtraID)
            {
                return BadRequest();
            }

            db.Entry(flightExtra).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExtraExists(id))
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

        // POST: api/FlightExtras
        [AllowAnonymous]
        [ResponseType(typeof(FlightExtra))]
        public IHttpActionResult PostFlightExtra(FlightExtra flightExtra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.FlightExtras.Add(flightExtra);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = flightExtra.ExtraID }, flightExtra);
        }

        // DELETE: api/FlightExtras/5
        [AllowAnonymous]
        [ResponseType(typeof(FlightExtra))]
        public IHttpActionResult DeleteFlightExtra(int id)
        {
            FlightExtra flightExtra = db.FlightExtras.Find(id);
            if (flightExtra == null)
            {
                return NotFound();
            }

            db.FlightExtras.Remove(flightExtra);
            db.SaveChanges();

            return Ok(flightExtra);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FlightExtraExists(int id)
        {
            return db.FlightExtras.Count(e => e.ExtraID == id) > 0;
        }
    }
}