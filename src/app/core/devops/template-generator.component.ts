import { Component } from '@angular/core';
import { TableMetaData } from '../table/TableCommonSetting';
import { Option } from '../select/Option.wrapper';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tas-temp-generator',
  templateUrl: './template-generator.component.html',
  styleUrls: ['./template-generator.component.css']
})
export class TemplateGeneratorComponent {
  apiResources: TableMetaData[];
  hostenviorments: Option[] = [
    { id: '0', name: 'None' },
    { id: '1', name: 'OpenStack' },
    { id: '2', name: 'AWS' },
    { id: '3', name: 'AZURE' },
    { id: '4', name: 'GCP' }
  ];
  templateTypes: Option[] = [
    { id: '0', name: 'None' },
    { id: '1', name: 'ansible' },
    { id: '2', name: 'cloud native' }
  ];

  onSelect(event) {
    const hostingEnv = event.srcElement.selectedOptions[0].label;

    console.log('Hosting Env. is : ' + hostingEnv);
    if (hostingEnv.toUpperCase() === 'OPENSTACK') {

      this.apiResources = [{
        headers: [
          'id',
          'admin_state_update',
          'dns_domain',
          'name',
          'port_security_enabled',
          'qos_policy',
          'shared',
          'tenant_id'
        ],
        metadata: {label:'NETWORKS', resource:'OS::Neutron::Net'},
        series: [  {
          id: '1',
          admin_state_update: 'No',
          dns_domain: 'hpe.corp',
          name: 'NET1',
          port_security_enabled: 'false',
          qos_policy: 'NA',
          shared: 'No',
          tenant_id: 'TAS'
        }]
      },
      {
        headers: [
            'admin_pass',
            'availability_zone',
            'diskConfig',
            'flavor',
            'flavor_update_policy',
            'image',
            'image_update_policy',
            'key_name',
            'name',
            'networks',
           'personality',
            'security_groups',
            'user_data',
            'user_data_format',
            'user_data_update_policy'
          ],
          metadata: {label:'SERVERS/NODES', resource:'OS::Nova::Server'},
          series: [{
          admin_pass: '1',
          availability_zone:'nova',
          diskConfig: 'No',
          flavor: 'hpe.corp',
          flavor_update_policy: 'NET1',
          image: 'false',
          image_update_policy: 'NA',
          key_name: 'No',
          name: 'TAS',
          networks: 'TAS',
          personality: 'TAS',
          security_groups: 'TAS',
          user_data: 'TAS',
          user_data_format: 'TAS',
          user_data_update_policy: 'TAS',

        }]
      },{
        headers:  [
          'allocation_pools',
           'cidr',
           'dns_nameservers',
           'enable_dhcp',
           'gateway_ip',
           'ip_version',
           'name',
           'network',
           'segment',
           'subnetpool',
           'tenant_id'
         ],
         metadata: {label:'SUBNETS', resource:'OS::Neutron::Subnet'},
         series: [{
          allocation_pools: '1',
          cidr: 'No',
          dns_nameservers: 'hpe.corp',
          enable_dhcp: 'NET1',
          gateway_ip: 'false',
          ip_version:'0',
          name: 'NA',
          network: 'No',
          segment: 'TAS',
          subnetpool: 'No',
          tenant_id: 'TAS',

        }]
      },{
        headers: [
          'admin_state_up',
           'binding:vnic_type',
           'device_id',
           'device_owner',
           'dns_name',
           'mac_address',
           'name',
           'network',
           'port_security_enabled',
           'qos_policy',
           'security_groups'
         ],
         metadata: {label:'PORTS', resource:'OS::Neutron::Port'},
         series: [{
          admin_state_up: '1',
          binding_vnic_type: 'No',
          device_id: 'hpe.corp',
          device_owner: 'NET1',
          dns_name: 'false',
          mac_address: 'NA',
          name: 'No',
          network: 'TAS',
          port_security_enabled: 'No',
          qos_policy: 'TAS',
          security_groups:'default'

        }]
      },{
        headers:[
          'dns_domain',
          'dns_name',
          'fixed_ip_address',
          'floating_ip_address',
          'floating_network',
          'floating_subnet',
          'port_id'
        ],
        metadata: {label:'FLOATING IP', resource:'OS::Neutron::FloatingIP'},
        series: [{
          dns_domain: '1',
          dns_name: 'No',
          fixed_ip_address: 'hpe.corp',
          floating_ip_address: 'NET1',
          floating_network: 'false',
          floating_subnet: 'No',
          port_id: 'TAS'
        }]
      },{
        headers:[
          'availability_zone',
          'description',
          'image',
          'multiattach',
          'name',
          'read_only',
          'scheduler_hints',
          'size',
          'snapshot_id',
          'volume_type'
        ],
       metadata: {label:'CINDER VOLUMES', resource:'OS::Cinder::Volume'},
       series: [{
          availability_zone: '1',
          description: 'No',
          image: 'hpe.corp',
          multiattach: 'NET1',
          name: 'false',
          read_only: 'NA',
          scheduler_hints: 'No',
          size: 'TAS',
          snapshot_id: 'TAS',
          volume_type: 'TAS'
        }]
      }];






    } else if (hostingEnv.toUpperCase() === 'AWS') {
      this.apiResources = [];

    } else if (hostingEnv.toUpperCase() === 'GCP') {
      this.apiResources = [];

    } else if (hostingEnv.toUpperCase() === 'GCP') {
      this.apiResources = [];

    } else if (hostingEnv.toUpperCase() === 'AZURE') {
      this.apiResources = [];

    } else {
      alert('Please select the hosting enviorment...');
    }
  }

  tablechanged(data) {
    // alert("coming");
  }

  buildTemplate(data)
  {


    const templateVersion = 'heat_template_version: 2015-04-30';

    const resourceType = data.metadata.resource;
    const n0 = '\n';
    let template;
    // tslint:disable-next-line: only-arrow-functions
    data.series.forEach(function (element, i)
    {
      console.log('------ RESOURCE START ------');
      template = templateVersion;
      template += n0 + '  type: ' + resourceType;
      // tslint:disable-next-line:align
      template += n0 + '  properties:';
      // tslint:disable-next-line: forin
      for (const key in element) {
        template += n0 + '    ' + key + ': ' + element[key];
      }
      console.log(template);
      console.log('------ RESOURCE END  ------');
    });
  }
  help()
  {
    alert("Coming soon");
  }
  clearData(resource)
  {
    if (window.confirm('Do you want to erase all data...?')) {
      resource.series = [];
    }

  }
}
