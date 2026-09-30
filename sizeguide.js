document.addEventListener("DOMContentLoaded", function () {

    // Create Size Guide Modal
    const modalHTML = `
        <div class="modal fade" id="sizeGuideModal" tabindex="-1" aria-hidden="true">

            <div class="modal-dialog modal-dialog-centered">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title">
                            Size Guide
                        </h5>

                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>

                    <div class="modal-body">

                        <p class="text-muted">
                            Choose your size based on the measurements below.
                        </p>

                        <div class="table-responsive">

                            <table class="table text-center align-middle">

                                <thead>
                                    <tr>
                                        <th>Size</th>
                                        <th>Chest</th>
                                        <th>Length</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>S</td>
                                        <td>58 cm</td>
                                        <td>70 cm</td>
                                    </tr>

                                    <tr>
                                        <td>M</td>
                                        <td>60 cm</td>
                                        <td>72 cm</td>
                                    </tr>

                                    <tr>
                                        <td>L</td>
                                        <td>62 cm</td>
                                        <td>74 cm</td>
                                    </tr>

                                    <tr>
                                        <td>XL</td>
                                        <td>64 cm</td>
                                        <td>76 cm</td>
                                    </tr>

                                    <tr>
                                        <td>XXL</td>
                                        <td>66 cm</td>
                                        <td>78 cm</td>
                                    </tr>
                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);


    // Get all Size Guide buttons
    const sizeGuides = document.querySelectorAll(".size-guide");

    sizeGuides.forEach(function (button) {

        button.addEventListener("click", function (e) {

            e.preventDefault();

            const modalElement = document.getElementById("sizeGuideModal");

            const sizeModal = new bootstrap.Modal(modalElement);

            sizeModal.show();

        });

    });

});