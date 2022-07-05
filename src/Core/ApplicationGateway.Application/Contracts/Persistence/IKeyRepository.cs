﻿using ApplicationGateway.Domain.Entities;

namespace ApplicationGateway.Application.Contracts.Persistence
{
    public interface IKeyRepository:IAsyncRepository<Key>
    {
        Task<(IEnumerable<Key> list, int count)> GetSearchedResponseAsync(int page, int size, string col, string value, string sortParam = null, bool isDesc = false);
    }
}
