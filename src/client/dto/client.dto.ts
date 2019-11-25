import { ApiModelProperty } from '@nestjs/swagger';

export class CreateClientDto {
    @ApiModelProperty()
    readonly rut: string;

    @ApiModelProperty()
    readonly rut_chilen: string;

    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly last_name: string;

    @ApiModelProperty()
    readonly phone: string;

    @ApiModelProperty()
    readonly sex: string;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly address: Array<string>;

    readonly createdAt: Date;
}
