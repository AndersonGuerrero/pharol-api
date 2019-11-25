import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Client } from './interfeces/client.interface';
import { CreateClientDto } from './dto/client.dto';


@Injectable()
export class ClientService {
    constructor(@InjectModel('Clients') private readonly clientModel: Model<Client>) { }

    async getClients(): Promise<Client[]> {
        const clients = await this.clientModel.find();
        return clients;
    }

    async getClientsFilter(createClientDto:CreateClientDto): Promise<Client[]> {
        const clients = await this.clientModel.find(createClientDto);
        return clients;
    }

    async getClient(clientId: string): Promise<Client> {
        try {
            const client = await this.clientModel.findById(clientId);
            return client;
        } catch (error) {
            throw new NotFoundException('Client Does not exist');
        }
    }

    async createClient(createClientDto: CreateClientDto): Promise<Client> {
        const client = new this.clientModel(createClientDto);
        return await client.save();
    }

    async deleteClient(clientId: string): Promise<Client> {
        try {
            const client = await this.clientModel.findByIdAndDelete(clientId);
            return client;
        } catch (error) {
            throw new NotFoundException('Client Does not exist');    
        }
    }

    async updateClient(clientId: string, createClientDto: CreateClientDto): Promise<Client> {
        try {
            const updatedClient = await this.clientModel.findByIdAndUpdate(
            clientId, createClientDto, { new: true });
            return updatedClient;
        } catch (error) {
            throw new NotFoundException('Client Does not exist');    
        }
    }
}
