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
    public class FlightArrivalsController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/FlightArrivals
        [AllowAnonymous]
        public IQueryable<Object> GetFlightArrivals()
        {
            var flightarrival = db.FlightArrivals.Select(x => new { x.ArrivalID, x.AirportName, x.ArrivalTime, x.ArrivalDate });
            return flightarrival;
        }

        // GET: api/FlightArrivals/5
        [AllowAnonymous]
        [ResponseType(typeof(FlightArrival))]
        public IHttpActionResult GetFlightArrival(int id)
        {
            FlightArrival flightArrival = db.FlightArrivals.Find(id);
            if (flightArrival == null)
            {
                return NotFound();
            }

            return Ok(flightArrival);
        }

        // PUT: api/FlightArrivals/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFlightArrival(int id, FlightArrival flightArrival)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != flightArrival.ArrivalID)
            {
                return BadRequest();
            }

            db.Entry(flightArrival).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightArrivalExists(id))
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

        // POST: api/FlightArrivals
        [AllowAnonymous]
        [ResponseType(typeof(FlightArrival))]
        public IHttpActionResult PostFlightArrival(FlightArrival flightArrival)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.FlightArrivals.Add(flightArrival);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = flightArrival.ArrivalID }, flightArrival);
        }

        // DELETE: api/FlightArrivals/5
        [AllowAnonymous]
        [ResponseType(typeof(FlightArrival))]
        public IHttpActionResult DeleteFlightArrival(int id)
        {
            FlightArrival flightArrival = db.FlightArrivals.Find(id);
            if (flightArrival == null)
            {
                return NotFound();
            }

            db.FlightArrivals.Remove(flightArrival);
            db.SaveChanges();

            return Ok(flightArrival);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FlightArrivalExists(int id)
        {
            return db.FlightArrivals.Count(e => e.ArrivalID == id) > 0;
        }
    }
}