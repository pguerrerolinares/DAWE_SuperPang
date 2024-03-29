import {Vec2D} from "./math.js";
import {Object2D} from "./math.js";
import Settings from "./Settings.js";

let HookType = {
    rope: 0,
    chain: 1,
};

class Hook extends Object2D {
    to_kill = false;

    constructor(height, position, hook_type, buffer) {
        super(new Vec2D(6, height), position);
        this.hook_type = hook_type;
        this.expand = true;
        this.timer = Settings.HOOK_DURATION;
        this.buffer = buffer;


    }

    draw(ctx) {
        // pintar el hook de buffer en la posición x,y de este objeto
        ctx.drawImage(this.buffer, this.position.x, this.position.y);

    }

    update(time_passed) {

        // si el hook no está en expansión -> decrementa el timer en time_passed unidades.
        // Si el timer es < 0 --> to_kill = true
        if (!this.expand) {
            this.timer -= time_passed;
        }
        if (this.timer < 0) {
            this.to_kill = true;
        }

        // si está en expansión y subiendo, incrementar tamaño y posición em increment unidades
        if (this.expand && this.position.y <= Settings.SCREEN_HEIGHT) {
            let increment = Settings.HOOK_SPEED * time_passed;
            this.size.y += increment;
            this.position.y -= increment;
        }

        // si sube hasta arriba, marcarlo para eliminar si es de tipo rope....
        // o marcarlo para que quede enganchado si es de tipo chain (reset de size 0 y position altura 0)
        if (this.position.y <= 0) {
            this.expand = false;
            if (this.hook_type === HookType.rope && !this.expand) {
                this.to_kill = true;
            } else if (this.hook_type === HookType.chain) {
                this.size.y = 0;
                this.position.y = 0;
            }
        }


    }

}

export {HookType, Hook};