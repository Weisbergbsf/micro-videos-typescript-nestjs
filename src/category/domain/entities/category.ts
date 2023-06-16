export type CategoryPros = {
    name: string;
    is_active?: boolean;
    description?: string;
    created_at?: Date;
}

export class Category {
    constructor(public readonly props: CategoryPros) {
        this.props.description = this.props.description ?? null;
        this.props.is_active = this.props.is_active ?? true;
        this.props.created_at = this.props.created_at ?? new Date();
    }

    get name() {
        return this.props.name;
    }

    get description() {
        return this.props.description;
    }

    private set description(value: string) {
        this.props.description = value ?? null;
    }

    get is_active() {
        return this.props.is_active;
    }

    private set is_active(value: boolean) {
        this.props.is_active = value ?? true;
    }

    get created_at() {
        return this.props.created_at;
    }
}
