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
    public class Flight_DepartureController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Flight_Departure
        [AllowAnonymous]
        public IQueryable<Object> GetFlight_Departures()
        {
            var flightDeparture = db.Flight_Departures.Select(x => new { x.AirportID, x.AircraftID, x.ArrivalID, x.AirportName, x.DepartingTime, x.DepartingDate });
            return flightDeparture;
        }

        // GET: api/Flight_Departure/5
        [AllowAnonymous]
        [ResponseType(typeof(Flight_Departure))]
        public IHttpActionResult GetFlight_Departure(int id)
        {
            Flight_Departure flight_Departure = db.Flight_Departures.Find(id);
            if (flight_Departure == null)
            {
                return NotFound();
            }

            return Ok(flight_Departure);
        }

        // PUT: api/Flight_Departure/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFlight_Departure(int id, Flight_Departure flight_Departure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != flight_Departure.AirportID)
            {
                return BadRequest();
            }

            db.Entry(flight_Departure).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Flight_DepartureExists(id))
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

        // POST: api/Flight_Departure
        [AllowAnonymous]
        [ResponseType(typeof(Flight_Departure))]
        public IHttpActionResult PostFlight_Departure(Flight_Departure flight_Departure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Flight_Departures.Add(flight_Departure);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = flight_Departure.AirportID }, flight_Departure);
        }

        // DELETE: api/Flight_Departure/5
        [AllowAnonymous]
        [ResponseType(typeof(Flight_Departure))]
        public IHttpActionResult DeleteFlight_Departure(int id)
        {
            Flight_Departure flight_Departure = db.Flight_Departures.Find(id);
            if (flight_Departure == null)
            {
                return NotFound();
            }

            db.Flight_Departures.Remove(flight_Departure);
            db.SaveChanges();

            return Ok(flight_Departure);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Flight_DepartureExists(int id)
        {
            return db.Flight_Departures.Count(e => e.AirportID == id) > 0;
        }
    }
}