package com.store.spring.app.DTO;

import com.store.spring.app.Models.RoleName;

public class RoleRequestDTO {
    private RoleName name;

    public RoleRequestDTO() {
    }

    public RoleName getName() {
        return name;
    }

    public void setName(RoleName name) {
        this.name = name;
    }
}
