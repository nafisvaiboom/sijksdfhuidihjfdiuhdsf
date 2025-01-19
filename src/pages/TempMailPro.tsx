{/* Previous code remains the same until line 288 */}
            <h1 className="text-5xl font-bold mb-6">
              Professional Temporary Email Service
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Enterprise-grade temporary email solution with advanced features and extended validity
            </p>

            {/* Quick Email Generator */}
            <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
              <div className="text-center">
                <button
                  onClick={generateEmail}
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-white text-[#4A90E2] rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-[#4A90E2] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Generate Professional Email
                    </>
                  )}
                </button>

                {generatedEmail && (
                  <div className="mt-4 bg-white/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">{generatedEmail}</span>
                      <CopyButton text={generatedEmail} className="text-white hover:text-white/80" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center text-white/80">
                <Shield className="w-5 h-5 mr-2" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center text-white/80">
                <Clock className="w-5 h-5 mr-2" />
                <span>2+ Months Validity</span>
              </div>
              <div className="flex items-center text-white/80">
                <Users className="w-5 h-5 mr-2" />
                <span>Team Collaboration</span>
              </div>
              <div className="flex items-center text-white/80">
                <Code className="w-5 h-5 mr-2" />
                <span>API Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for secure temporary communications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <feature.icon className="w-12 h-12 text-[#4A90E2] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-gradient-to-br from-[#4A90E2]/5 to-[#357ABD]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Flexible options for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  tier.recommended ? 'ring-2 ring-[#4A90E2]' : ''
                }`}
              >
                {tier.recommended && (
                  <div className="bg-[#4A90E2] text-white text-center py-2 text-sm font-medium">
                    Recommended
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {tier.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {tier.price}
                    </span>
                    {tier.price !== 'Custom' && (
                      <span className="text-gray-600">/month</span>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-[#4A90E2] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-[#4A90E2] text-white rounded-lg px-6 py-3 hover:bg-[#357ABD] transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`inline-block w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="py-24 bg-gradient-to-br from-[#4A90E2]/5 to-[#357ABD]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 text-[#4A90E2] mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-medium text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Developer Tools & Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Powerful tools for developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <integration.icon className="w-12 h-12 text-[#4A90E2] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {integration.name}
                  {integration.comingSoon && (
                    <span className="ml-2 text-sm bg-[#4A90E2] text-white px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </h3>
                <p className="text-gray-600">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-24 bg-gradient-to-br from-[#4A90E2]/5 to-[#357ABD]/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our professional service
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust our service for their
            temporary email needs.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-[#4A90E2] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#357ABD] transition-colors inline-flex items-center"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="bg-white text-[#4A90E2] border border-[#4A90E2] px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Email generated successfully!
        </div>
      )}
    </PublicLayout>
  );
}