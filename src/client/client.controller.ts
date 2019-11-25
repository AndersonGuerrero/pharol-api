import { UsePipes, Controller, Get, Post, Put, Delete, Res, Body, HttpStatus, Param, NotFoundException, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiUseTags, ApiNotFoundResponse } from '@nestjs/swagger';

import { ClientService } from './client.service'
import { CreateClientDto } from './dto/client.dto'
import { createClientSchema, updateClientSchema } from './joi/client'
import { JoiValidationPipe } from './joi/JoiValidationPipe'

@ApiUseTags('clients')
@Controller('client')
export class ClientController {
    constructor(private clientService: ClientService){}

    @Get('/')
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async getClients(@Res() res){
        const clients = await this.clientService.getClients();
        return res.status(HttpStatus.OK).json({
            message: 'Clients Success list',
            clients
        });
    }

    @Post('/')
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @UsePipes(new JoiValidationPipe(updateClientSchema))
    async getClientsFilter(
        @Res() res, @Body() createClientDto:CreateClientDto) {
            const clients = await this.clientService.getClientsFilter(createClientDto);
            return res.status(HttpStatus.OK).json({
                message: 'Clients filter list',
                clients
            });
        }
        
    @Post('/create')
    @ApiCreatedResponse({ description: 'The record has been successfully created.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @UsePipes(new JoiValidationPipe(createClientSchema))
    async createClient(@Res() res, @Body() createClientDto:CreateClientDto ){
        const client = await this.clientService.createClient(createClientDto);
        return res.status(HttpStatus.OK).json({
            message: 'Client Successfully Created',
            client
        });
    }

    @Get('/:clientId')
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Client Does not exist'})
    async getCLient(@Res() res, @Param('clientId') clientId){
        const client = await this.clientService.getClient(clientId);
        res.status(HttpStatus.OK).json({
            message: 'Client Success',
            client
        });
    }
    
    @Delete('/delete/:clientId')
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Client Does not exist'})
    async deleteClient(@Res() res, @Param('clientId') clientId ){
        const clientDeleted = await this.clientService.deleteClient(clientId);
        if(!clientDeleted) throw new NotFoundException('Client Does not exist');
        res.status(HttpStatus.OK).json({
            message: 'Client Deleted Successfully',
            clientDeleted
        });
    }
    
    @Put('/update/:clientId')
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Client Does not exist'})
    @UsePipes(new JoiValidationPipe(updateClientSchema))
    async updateClient(@Res() res, @Body() createClientDto: CreateClientDto, @Param('clientId') clientId){
        const updatedClient = await this.clientService.updateClient(clientId, createClientDto);   
        res.status(HttpStatus.OK).json({
            message: 'Client Update Successfully',
            updatedClient
        });
    }
}
