// backend/modelos/gastronomia/taller.modelo.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Taller',
    tableName: 'talleres',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid',
        },
        restaurante_id: {
            type: 'uuid',
            nullable: false,
        },
        nombre: {
            type: 'varchar',
            length: 200,
        },
        descripcion: {
            type: 'text',
            nullable: true,
        },
        duracion: {
            type: 'varchar',
            length: 50,
            nullable: true,
        },
        precio: {
            type: 'decimal',
            precision: 10,
            scale: 2,
        },
        capacidad_maxima: {
            type: 'integer',
            nullable: true,
        },
        horarios: {
            type: 'text',
            array: true,
            default: '{}',
        },
        incluye_materiales: {
            type: 'boolean',
            default: true,
        },
        plato_principal: {
            type: 'varchar',
            length: 200,
            nullable: true,
        },
        fotos: {
            type: 'text',
            array: true,
            default: '{}',
        },
        disponible: {
            type: 'boolean',
            default: true,
        },
        created_at: {
            type: 'timestamp',
            createDate: true,
            default: () => 'CURRENT_TIMESTAMP',
        },
        updated_at: {
            type: 'timestamp',
            updateDate: true,
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
    indices: [
        { columns: ['restaurante_id'] },
        { columns: ['disponible'] },
    ],
    relations: {
        restaurante: {
            type: 'many-to-one',
            target: 'Restaurante',
            joinColumn: { name: 'restaurante_id' },
        },
    },
});