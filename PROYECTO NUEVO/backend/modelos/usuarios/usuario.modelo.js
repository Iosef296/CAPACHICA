// backend/modelos/auth/usuario.modelo.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Usuario',
    tableName: 'usuarios',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid',
        },
        nombre: {
            type: 'varchar',
            length: 100,
        },
        email: {
            type: 'varchar',
            length: 150,
            unique: true,
        },
        password_hash: {
            type: 'varchar',
            length: 255,
            select: false,
        },
        rol: {
            type: 'enum',
            enum: ['admin', 'proveedor', 'turista'],
            default: 'turista',
        },
        telefono: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        foto: {
            type: 'text',
            nullable: true,
        },
        activo: {
            type: 'boolean',
            default: true,
        },
        fecha_registro: {
            type: 'timestamp',
            createDate: true,
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
    indices: [
        { columns: ['email'] },
        { columns: ['rol'] },
    ],
});