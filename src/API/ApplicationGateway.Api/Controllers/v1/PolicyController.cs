﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using ApplicationGateway.Application.Features.Policy.Commands.CreatePolicyCommand;
using MediatR;
using ApplicationGateway.Application.Responses;
using ApplicationGateway.Domain.TykData;
using Newtonsoft.Json;
using JUST;
using ApplicationGateway.Application.Models.Tyk;
using Microsoft.Extensions.Options;
using ApplicationGateway.Application.Features.Policy.Commands.UpdatePolicyCommand;
using ApplicationGateway.Application.Features.Policy.Commands.DeletePolicyCommand;

namespace ApplicationGateway.Api.Controllers
{
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class PolicyController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<PolicyController> _logger;
        private readonly TykConfiguration _tykConfiguration;

        public PolicyController(IMediator mediator, ILogger<PolicyController> logger, IOptions<TykConfiguration> tykConfiguration)
        {
            _mediator = mediator;
            _logger = logger;
            _tykConfiguration = tykConfiguration.Value;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> GetAllPolicies()
        {
            string folderPath = _tykConfiguration.PoliciesFolderPath;
            if (!Directory.Exists(folderPath) || !System.IO.File.Exists(folderPath + @"\policies.json"))
            {
                return NotFound("Policies not found");
            }

            string policiesJson = System.IO.File.ReadAllText(folderPath + @"\policies.json");
            JObject policiesObject = JObject.Parse(policiesJson);

            return Ok(policiesObject.ToString());
        }

        [HttpGet("{policyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetPolicyByid(Guid policyId)
        {
            string folderPath = _tykConfiguration.PoliciesFolderPath;
            if (!Directory.Exists(folderPath) || !System.IO.File.Exists(folderPath + @"\policies.json"))
            {
                return NotFound("Policies not found");
            }

            string policiesJson = System.IO.File.ReadAllText(folderPath + @"\policies.json");
            JObject policiesObject = JObject.Parse(policiesJson);
            if (!policiesObject.ContainsKey(policyId.ToString()))
            {
                return NotFound($"Policy with id: {policyId} was not found");
            }

            string policy = (policiesObject[policyId.ToString()] as JObject).ToString();

            return Ok(policy);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreatePolicy(CreatePolicyCommand createPolicyCommand)
        {
            _logger.LogInformation("CreatePolicy Initiated with {@CreatePolicyCommand}", createPolicyCommand);
            Response<CreatePolicyDto> response = await _mediator.Send(createPolicyCommand);
            _logger.LogInformation("CreatePolicy Completed");
            return Ok(response);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdatePolicy(UpdatePolicyCommand updatePolicyCommand)
        {
            _logger.LogInformation("UpdatePolicy Initiated with {@UpdatePolicyCommand}", updatePolicyCommand);
            Response<UpdatePolicyDto> response = await _mediator.Send(updatePolicyCommand);
            _logger.LogInformation("UpdatePolicy Completed");
            return Ok(response);
        }

        [HttpDelete("{policyId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeletePolicy(Guid policyId)
        {
            _logger.LogInformation("DeletePolicy Initiated with {@Guid}", policyId);
            await _mediator.Send(new DeletePolicyCommand() { PolicyId = policyId});
            _logger.LogInformation("DeletePolicy Completed");
            return NoContent();
        }
    }
}
