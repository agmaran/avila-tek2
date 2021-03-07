class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { products: [], show: true, voted_products: [], voted_products_ids: [], date: new Date(), products_of_the_day: [] };
        this.showProduct = this.showProduct.bind(this);
        this.vote = this.vote.bind(this);
        this.unvote = this.unvote.bind(this);
        this.newer = this.newer.bind(this);
        this.older = this.older.bind(this);
    }

    componentDidMount() {
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        fetch(`/products/${date}`)
            .then(response => response.json())
            .then(result => {
                console.log(result.products)
                var aux = []
                if (result.voted_products !== null) {
                    result.voted_products.map((product) => {
                        aux.push(product.id)
                    })
                    this.setState({ products: result.products, voted_products: result.voted_products, voted_products_ids: aux })
                } else {
                    this.setState({ products: result.products })
                }
                var counter = 0
                var p = []
                if (result.products !== null) {
                    result.products.map((product) => {
                        if (product.votes > counter) {
                            counter = product.votes
                            p = []
                            p.push(product)
                        }
                        if (product.votes === counter) {
                            p.push(product)
                        }
                    })
                }
                this.setState({ products_of_the_day: p })
            })
            .catch(e => {
                console.log(e);
            })
    }

    newer() {
        this.state.date.setDate(this.state.date.getDate() + 1);
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        fetch(`/products/${date}`)
            .then(response => response.json())
            .then(result => {
                console.log(result.products)
                var aux = []
                if (result.voted_products !== null) {
                    result.voted_products.map((product) => {
                        aux.push(product.id)
                    })
                    this.setState({ products: result.products, voted_products: result.voted_products, voted_products_ids: aux })
                } else {
                    this.setState({ products: result.products })
                }
                var counter = 0
                var p = []
                if (result.products !== null) {
                    result.products.map((product) => {
                        if (product.votes > counter) {
                            counter = product.votes
                            p = []
                            p.push(product)
                        }
                        if (product.votes === counter) {
                            p.push(product)
                        }
                    })
                }
                this.setState({ products_of_the_day: p })

            })
            .catch(e => {
                console.log(e);
            })
    }

    older() {
        this.state.date.setDate(this.state.date.getDate() - 1);
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        fetch(`/products/${date}`)
            .then(response => response.json())
            .then(result => {
                console.log(result.products)
                var aux = []
                if (result.voted_products !== null) {
                    result.voted_products.map((product) => {
                        aux.push(product.id)
                    })
                    this.setState({ products: result.products, voted_products: result.voted_products, voted_products_ids: aux })
                } else {
                    this.setState({ products: result.products })
                }
                var counter = 0
                var p = []
                if (result.products !== null) {
                    result.products.map((product) => {
                        if (product.votes > counter) {
                            counter = product.votes
                            p = []
                            p.push(product)
                        }
                        if (product.votes === counter) {
                            p.push(product)
                        }
                    })
                }
                this.setState({ products_of_the_day: p })

            })
            .catch(e => {
                console.log(e);
            })

    }

    showProduct(event) {
        this.setState({ show: false })
        ReactDOM.render(<Product id={event.currentTarget.getAttribute("data-id")} />, document.querySelector('#index'))
    }

    vote(event) {
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        fetch('/vote', {
            method: 'POST',
            body: JSON.stringify({
                product_id: event.currentTarget.getAttribute("data-product"),
                date: date
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    window.location = '/login'
                } else {
                    var aux = []
                    if (result.voted_products !== null) {
                        result.voted_products.map((product) => {
                            aux.push(product.id)
                        })
                        this.setState({ products: result.products, voted_products: result.voted_products, voted_products_ids: aux })
                    } else {
                        this.setState({ products: result.products })
                    }
                    var counter = 0
                    var p = []
                    if (result.products !== null) {
                        result.products.map((product) => {
                            if (product.votes > counter) {
                                counter = product.votes
                                p = []
                                p.push(product)
                            }
                            if (product.votes === counter) {
                                p.push(product)
                            }
                        })
                    }
                    this.setState({ products_of_the_day: p })
                }
            })
    }

    unvote(event) {
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        fetch('/unvote', {
            method: 'POST',
            body: JSON.stringify({
                product_id: event.currentTarget.getAttribute("data-product"),
                date: date
            })
        })
            .then(response => response.json())
            .then(result => {

                var aux = []
                if (result.voted_products !== null) {
                    result.voted_products.map((product) => {
                        aux.push(product.id)
                    })
                    this.setState({ products: result.products, voted_products: result.voted_products, voted_products_ids: aux })
                } else {
                    this.setState({ products: result.products })
                }
                var counter = 0
                var p = []
                if (result.products !== null) {
                    result.products.map((product) => {
                        if (product.votes > counter) {
                            counter = product.votes
                            p = []
                            p.push(product)
                        }
                        if (product.votes === counter) {
                            p.push(product)
                        }
                    })
                }
                this.setState({ products_of_the_day: p })
            })
    }

    render() {
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        let d = new Date()
        let today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        d.setDate(d.getDate() - 1);
        let yesterday = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        if (this.state.products.length > 0) {
            var products = this.state.products.map((product) => {
                return (
                    <div key={product.id} className="container row">
                        <img src={product.logo} className="col-2 h-100 pointer" onClick={this.showProduct} data-id={product.id} />
                        <div className="col-6 pointer" onClick={this.showProduct} data-id={product.id}>
                            <div>{product.name}</div>
                            <div>{product.description}</div>
                        </div>
                        <div className="col-2">
                            {!this.state.voted_products_ids.includes(product.id) && <a data-product={product.id} onClick={this.vote}>{product.votes}<i className="bi bi-star ml-3 mr-1 pointer"></i></a>}
                            {this.state.voted_products_ids.includes(product.id) && <a data-product={product.id} onClick={this.unvote}>{product.votes}<i className="bi bi-star-fill ml-3 mr-1 pointer"></i></a>}
                        </div>
                        {this.state.products_of_the_day.includes(product) && <div className="col-2">Product of the Day</div>}
                    </div>
                )
            })

            return (
                <div>
                    {this.state.show && date === today && <h3 className="padding">Today</h3>}
                    {this.state.show && date === yesterday && <h3 className="padding">Yesterday</h3>}
                    {this.state.show && date !== yesterday && date !== today && <h3 className="padding">{this.state.date.getMonth() + 1}/{this.state.date.getDate()}/{this.state.date.getFullYear()}</h3>}
                    {this.state.show && <div>{products}</div>}
                    {this.state.show && <nav aria-label="Page navigation example" className="col-12">
                        <ul className="pagination">
                            {!(date === today) && <li className="page-item"><a className="page-link pointer" onClick={this.newer}>Newer</a></li>}
                            <li className="page-item"><a className="page-link pointer" onClick={this.older}>Older</a></li>
                        </ul>
                    </nav>}
                </div>
            )
        } else {
            return (
                <div>
                    {this.state.show && date === today && <h3 className="padding">Today</h3>}
                    {this.state.show && date === yesterday && <h3 className="padding">Yesterday</h3>}
                    {this.state.show && date !== yesterday && date !== today && <h3 className="padding">{this.state.date.getMonth() + 1}/{this.state.date.getDate()}/{this.state.date.getFullYear()}</h3>}
                    <div>There were no products launched the {this.state.date.getMonth() + 1}/{this.state.date.getDate()}/{this.state.date.getFullYear()}.</div>
                    <nav aria-label="Page navigation example" className="col-12">
                        <ul className="pagination">
                            {!(date === today) && <li className="page-item"><a className="page-link pointer" onClick={this.newer}>Newer</a></li>}
                            <li className="page-item"><a className="page-link pointer" onClick={this.older}>Older</a></li>
                        </ul>
                    </nav>
                </div>
            )
        }
    }
}

ReactDOM.render(<ProductList />, document.querySelector('#index'))

class NewProductButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.newProduct = this.newProduct.bind(this);
    }

    newProduct(event) {
        this.setState({ clicked: true })
        ReactDOM.render(<NewProductForm />, document.querySelector('#index'))
    }

    render() {

        return (
            <button className="new" onClick={this.newProduct}>New</button>
        )

    }
}

if (document.querySelector('#new-product-button') !== null) {
    ReactDOM.render(<NewProductButton />, document.querySelector('#new-product-button'))
}

class NewProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            logo: '',
            image1: '',
            image2: '',
            image3: '',
            link: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createProduct = this.createProduct.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createProduct(event) {
        fetch('/newproduct', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                logo: this.state.logo,
                image1: this.state.image1,
                image2: this.state.image2,
                image3: this.state.image3,
                link: this.state.link
            })
        })
            .then(response => response.jason())
            .then(result => {
                if (result.error) {
                    console.log(result.error)
                } else {
                    window.location = '/'
                }
            })

        event.preventDefault();
    }

    render() {
        return (
            <div className="margin">
                <h3>New Product</h3>
                <div className="form-group margin">
                    <input name="name" className="form-control" autoFocus type="text" placeholder="Product Name" value={this.state.name} onChange={this.handleInputChange} />
                </div>
                <div className="form-group margin">
                    <label htmlFor="description">Short description</label>
                    <textarea name="description" className="form-control" value={this.state.description} onChange={this.handleInputChange}></textarea>
                </div>
                <div className="form-group margin">
                    <input name="logo" className="form-control" type="url" placeholder="Logo URL" value={this.state.logo} onChange={this.handleInputChange} />
                </div>
                <div className="form-group margin">
                    <input name="image1" className="form-control" type="url" placeholder="Image URL" value={this.state.image1} onChange={this.handleInputChange} />
                </div>
                <div className="form-group margin">
                    <input name="image2" className="form-control" type="url" placeholder="Image URL" value={this.state.image2} onChange={this.handleInputChange} />
                </div>
                <div className="form-group margin">
                    <input name="image3" className="form-control" type="url" placeholder="Image URL" value={this.state.image3} onChange={this.handleInputChange} />
                </div>
                <div className="form-group margin">
                    <input name="link" className="form-control" type="url" placeholder="Product link" value={this.state.link} onChange={this.handleInputChange} />
                </div>
                <input className="btn btn-primary" type="submit" value="Create" onClick={this.createProduct} />
            </div>
        )
    }
}

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { product: '' };
        this.goHome = this.goHome.bind(this);
    }

    componentDidMount() {
        fetch(`/product/${this.props.id}`)
            .then(response => response.json())
            .then(result => {
                console.log(result.product)
                this.setState({ product: result.product })
            })
            .catch(e => {
                console.log(e);
            })
    }

    goHome() {
        window.location = '/'
    }
    render() {
        return (
            <div className="row">
                <a class="page-link" onClick={this.goHome}>
                    <span>&laquo;</span>
                </a>
                <img src={this.state.product.logo} className="col-2 h-100" />
                <div className="col-10">
                    <div>{this.state.product.name}</div>
                    <div>{this.state.product.description}</div>
                </div>
                <div></div>
                <div className="row">
                    <img src={this.state.product.image1} className="col-4 h-100" />
                    <img src={this.state.product.image2} className="col-4 h-100" />
                    <img src={this.state.product.image3} className="col-4 h-100" />
                </div>
            </div>
        )
    }
}