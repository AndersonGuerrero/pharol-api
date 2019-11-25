import { Controller, Get, Post, Put, Delete, Res, Body, HttpStatus, Param, NotFoundException, Query } from '@nestjs/common';

import { ClientService } from './client.service'
import { CreateClientDto } from './dto/client.dto'

@Controller('client')
export class ClientController {
    constructor(private clientService: ClientService){}

    @Get('/')
    async getClients(@Res() res){
        const clients = await this.clientService.getClients();
        return res.status(HttpStatus.OK).json({
            message: 'Clients Success list',
            clients
        });
    }

    @Post('/')
    async getClientsFilter(
        @Res() res, @Body() createClientDto:CreateClientDto) {
        const clients = await this.clientService.getClientsFilter(createClientDto);
        return res.status(HttpStatus.OK).json({
            message: 'Clients filter list',
            clients
        });
    }

    @Post('/create')
    async createClient(@Res() res, @Body() createClientDto:CreateClientDto ){
        const client = await this.clientService.createClient(createClientDto);
        return res.status(HttpStatus.OK).json({
            message: 'Client Successfully Created',
            client
        });
    }

    @Get('/:clientId')
    async getCLient(@Res() res, @Param('clientId') clientId){
        const client = await this.clientService.getClient(clientId);
        if(!client) throw new NotFoundException('Client Does not exist');
        res.status(HttpStatus.OK).json({
            message: 'Client Success',
            client
        });
    }

    @Delete('/delete/:clientId')
    async deleteClient(@Res() res, @Param('clientId') clientId ){
        const clientDeleted = await this.clientService.deleteClient(clientId);
        if(!clientDeleted) throw new NotFoundException('Client Does not exist');
        res.status(HttpStatus.OK).json({
            message: 'Client Deleted Successfully',
            clientDeleted
        });
    }

    @Put('/update/:clientId')
    async updateClient(@Res() res, @Body() createClientDto: CreateClientDto, @Param('clientId') clientId){
        const updatedClient = await this.clientService.updateClient(clientId, createClientDto);   
        if(!updatedClient) throw new NotFoundException('Client Does not exist');
        res.status(HttpStatus.OK).json({
            message: 'Client Update Successfully',
            updatedClient
        });
    }
}
