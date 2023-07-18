export interface Change {
    id: string;
    type: string;
    description: string;
    versionId: string;
    public: boolean;
    createdAt: Date;
}
