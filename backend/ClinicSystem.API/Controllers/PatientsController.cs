using Microsoft.AspNetCore.Mvc;
using ClinicSystem.API.Data;
using ClinicSystem.API.Models;

namespace ClinicSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PatientsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Patients.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.PatientId == id);
            if (patient == null) return NotFound();
            return Ok(patient);
        }

        [HttpPost]
        public IActionResult Create(Patient patient)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Patients.Add(patient);
            _context.SaveChanges();

            return Ok(patient);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Patient updated)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var patient = _context.Patients.FirstOrDefault(p => p.PatientId == id);
            if (patient == null) return NotFound();

            patient.FirstName = updated.FirstName;
            patient.LastName = updated.LastName;
            patient.Email = updated.Email;

            _context.SaveChanges();

            return Ok(patient);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.PatientId == id);
            if (patient == null) return NotFound();

            _context.Patients.Remove(patient);
            _context.SaveChanges();

            return Ok();
        }
    }
}