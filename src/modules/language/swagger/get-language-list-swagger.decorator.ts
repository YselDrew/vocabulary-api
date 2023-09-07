import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

import { LanguageResponseDto } from '../dtos/get-language-list.dto';

export const GetLanguageListSwaggerDecorator = (): any =>
  applyDecorators(
    ApiOperation({
      summary: 'Returns list of languages',
    }),
    ApiOkResponse({
      description: 'List of languages for succefully received',
      schema: {
        allOf: [
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(LanguageResponseDto) },
              },
            },
          },
        ],
        example: getLanguageListResponse,
      },
    }),
    ApiExtraModels(LanguageResponseDto),
  );

const getLanguageListResponse = [
  {
    languageId: '7438fb96-3f4f-4228-a4c5-ca34256b39a1',
    languageName: 'English',
  },
];
