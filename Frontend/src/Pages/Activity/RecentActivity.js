import React from "react";

const RecentActivity = () => {

    
    return (
        <div className="container-fluid vstack gap-3 mt-5">
           <div className="card">
            <div className="card-body">
                <h5 className="mb-6"></h5>
                <div className="list-group list-group-flush list-group-borderless ms-4">
                    <div className="list-group-item px-2 py-0">
                        <div className="border-start">
                            <div className="d-flex ms-n6 pb-6">
                                <div className="flex-none me-3">
                                    <div className="icon icon-shape text-base w-12 h-12 bg-soft-primary text-primary rounded-circle">
                                        <i className="bi bi-file-earmark-pdf-fill"></i>
                                    </div>
                                </div>
                                <div>
                                    <small className="d-block mb-1 text-muted">2 hrs ago</small>
                                    <div>You've uploaded <span className="font-bold">documentation.pdf</span> to the <span className="font-bold">Webpixels</span> project</div>
                                    <div className="d-flex gap-2 mt-2">
                                        <div className="position-relative bg-light border border-dashed border-warning-hover rounded-pill">
                                            <div className="py-2 px-3 d-flex align-items-center">
                                                <div className="me-2">
                                                    <i className="bi bi-image text-warning"></i>
                                                </div>
                                                <div className="flex-fill">
                                                    <a href="#" className="d-block font-semibold text-xs text-muted text-warning-hover stretched-link">documentation.pdf</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item px-2 py-0">
                        <div className="border-start">
                            <div className="d-flex ms-n6 pb-6">
                                <div className="flex-none me-3">
                                    <div className="icon icon-shape text-base w-12 h-12 bg-soft-primary text-primary rounded-circle">
                                        <i className="bi bi-file-earmark-pdf-fill"></i>
                                    </div>
                                </div>
                                <div className="flex-fill">
                                    <small className="d-block mb-1 text-muted">4 hrs ago</small>
                                    <div className="text-sm">
                                        <span className="text-heading text-sm font-bold">Mike</span> added a new comment to your task:
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-muted">
                                            On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item px-2 py-0">
                        <div className="border-start">
                            <div className="d-flex ms-n6 pb-6">
                                <div className="flex-none me-3">
                                    <div className="icon icon-shape text-base w-12 h-12 bg-soft-primary text-primary rounded-circle">
                                        <i className="bi bi-file-earmark-pdf-fill"></i>
                                    </div>
                                </div>
                                <div className="flex-fill">
                                    <small className="d-block mb-1 text-muted">4 hrs ago</small>
                                    <div className="text-sm">
                                        Heather added <span className="font-bold">4 images</span> to the <span className="font-bold">Team</span> album:
                                    </div>
                                    <div className="mt-2 d-flex gap-2 scrollable-x">
                                        <div className="col-auto">
                                            <img alt="" src="/Ownerkit/img/media/img-3.jpg" className="rounded w-auto h-16"/>
                                        </div>
                                        <div className="col-auto">
                                            <img alt="" src="/Ownerkit/img/media/img-4.jpg" className="rounded w-auto h-16"/>
                                        </div>
                                        <div className="col-auto">
                                            <img alt="" src="/Ownerkit/img/media/img-5.jpg" className="rounded w-auto h-16"/>
                                        </div>
                                        <div className="col-auto">
                                            <img alt="" src="/Ownerkit/img/media/img-6.jpg" className="rounded w-auto h-16"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item px-2 py-0">
                        <div className="border-start">
                            <div className="d-flex ms-n6 pb-6">
                                <div className="flex-none me-3">
                                    <div className="icon icon-shape text-base w-12 h-12 bg-soft-primary text-primary rounded-circle">
                                        <i className="bi bi-file-earmark-pdf-fill"></i>
                                    </div>
                                </div>
                                <div className="flex-fill">
                                    <small className="d-block mb-1 text-muted">4 hrs ago</small>
                                    <div className="text-sm">
                                        Heather added <span className="font-bold">Anna</span> to the <span className="font-bold">Clever</span> team.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item px-2 py-0">
                        <div className="border-start">
                            <div className="d-flex ms-n6 pb-6">
                                <div className="flex-none me-3">
                                    <div className="icon icon-shape text-base w-12 h-12 bg-soft-primary text-primary rounded-circle">
                                        <i className="bi bi-file-earmark-pdf-fill"></i>
                                    </div>
                                </div>
                                <div className="flex-fill">
                                    <small className="d-block mb-1 text-muted">4 hrs ago</small>
                                    <div className="text-sm">
                                        Heather created the tags
                                        <div className="d-inline-block mx-1">
                                            <a href="#" className="badge rounded-pill bg-danger bg-opacity-20 bg-opacity-100-hover text-danger text-white-hover">Bugs</a> <a href="#" className="badge rounded-pill bg-success bg-opacity-20 bg-opacity-100-hover text-success text-white-hover">Showcase</a>
                                        </div>
                                        for the <span className="font-bold">Clever</span> project
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item px-2 py-0">
                        <div>
                            <div className="d-flex ms-n6 pb-6">
                                <div className="flex-none me-3">
                                    <div className="icon icon-shape text-base w-12 h-12 bg-soft-primary text-primary rounded-circle">
                                        <i className="bi bi-file-earmark-pdf-fill"></i>
                                    </div>
                                </div>
                                <div className="flex-fill">
                                    <small className="d-block mb-1 text-muted">2 hrs ago</small>
                                    <div>
                                        You've uploaded <span className="font-bold">documentation.pdf</span> to the <span className="font-bold">Webpixels</span> project
                                    </div>
                                    <div className="mt-2 scrollable-x overflow-hidden">
                                        <div className="d-inline-block position-relative bg-light border border-dashed border-tertiary-hover rounded-pill">
                                            <div className="py-2 px-3 d-flex align-items-center">
                                                <div className="me-2">
                                                    <i className="bi bi-image text-tertiary"></i>
                                                </div>
                                                <div className="flex-fill">
                                                    <a href="#" className="d-block font-semibold text-xs text-muted text-tertiary-hover stretched-link">design.fig</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-inline-block position-relative bg-light border border-dashed border-warning-hover rounded-pill">
                                            <div className="py-2 px-3 d-flex align-items-center">
                                                <div className="me-2">
                                                    <i className="bi bi-image text-warning"></i>
                                                </div>
                                                <div className="flex-fill">
                                                    <a href="#" className="d-block font-semibold text-xs text-muted text-warning-hover stretched-link">readme.md</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default RecentActivity;
