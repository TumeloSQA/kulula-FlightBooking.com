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
    public class FlightBookingsController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/FlightBookings
        [AllowAnonymous]
        public IQueryable<Object> GetFlightBookings()
        {
            var flightBookings = db.FlightBookings.Select(x => new { x.FlightID, x.CustomerID, x.AirportID, x.ExtraID,x.SeatNumber,  x.ReturningDate,x.NumberOfTravellers,x.TotalFare});
            return flightBookings;
        }

        // GET: api/FlightBookings/5
        /*
        [ResponseType(typeof(FlightBooking))]
        public IHttpActionResult GetFlightBooking(int id)
        {
            FlightBooking flightBooking = db.FlightBookings.Find(id);
            if (flightBooking == null)
            {
                return NotFound();
            }

            return Ok(flightBooking);
        }
        */
        // PUT: api/FlightBookings/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFlightBooking(int id, FlightBooking flightBooking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != flightBooking.FlightID)
            {
                return BadRequest();
            }

            db.Entry(flightBooking).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightBookingExists(id))
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

        // POST: api/FlightBookings
        [AllowAnonymous]
        [ResponseType(typeof(FlightBooking))]
        public IHttpActionResult PostFlightBooking(FlightBooking flightBooking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.FlightBookings.Add(flightBooking);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = flightBooking.FlightID }, flightBooking);
        }

        // DELETE: api/FlightBookings/5
        [AllowAnonymous]
        [ResponseType(typeof(FlightBooking))]
        public IHttpActionResult DeleteFlightBooking(int id)
        {
            FlightBooking flightBooking = db.FlightBookings.Find(id);
            if (flightBooking == null)
            {
                return NotFound();
            }

            db.FlightBookings.Remove(flightBooking);
            db.SaveChanges();

            return Ok(flightBooking);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FlightBookingExists(int id)
        {
            return db.FlightBookings.Count(e => e.FlightID == id) > 0;
        }
    }
}