const log = require("../utils/logger");

let roles = [
    {
        id: 1,
        roleName: "super admin"
    },
    {
        id: 2,
        roleName: "admin"
    },
    {
        id: 3,
        roleName: "user"
    },
    {
        id: 4,
        roleName: "viewer"
    }
]

const createRoles = async (user_roles) => {
    try {
        const rolesData = await user_roles.findAll();
        // log.info("Roles Data ==============>>>>>>>>>>>> ", rolesData);
        if (rolesData.length > 0) {
            log.info("=============>>>>>>>>>>>> Roles already created");
            return;
        }

        for (let i = 0; i < roles.length; i++) {
            user_roles.create({
                id: roles[i].id,
                roleName: `${roles[i].roleName}`,
            });
            log.info("roles Map =============>>>>>>>>>>>> ", roles[i].roleName);
        }

        log.info(">>>>>>>>>>>> Roles created successfully");

    } catch (error) {
        log.info(' Error in creating user roles ========>>>>>>>> ', error);
    }
};

module.exports = createRoles;