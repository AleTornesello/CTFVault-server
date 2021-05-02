import { Client } from '@elastic/elasticsearch';
import { container } from 'tsyringe';

import { Logger } from '../helpers';

export function configureElasticSearch(): void {
    const client = new Client({ node: process.env.ELASTIC_SEARCH_NODE });
    client.on('response', (err, result) => {
        if (err) Logger.error(err);
        else {
            Logger.debug(`Elasticsearch response`);
            Logger.debug(result);
        }
    });

    container.registerInstance(Client, client);

    client.cluster.health()
        .then(healthStatus => {
            Logger.info(`Elasticsearch health info`);
            Logger.info(healthStatus);
        })
        .catch(error => {
            Logger.crit(`Can not connect to Elasticsearch.`);
            Logger.crit(error);
        });
}