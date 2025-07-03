import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Mail, 
  Phone, 
  Globe, 
  Building,
  Calendar,
  Star,
  MessageSquare
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  project_type?: string;
  budget_range?: string;
  project_description?: string;
  phone?: string;
  website?: string;
  lead_status: string;
  priority_score: number;
  notes?: string;
  created_at: string;
  contacted_at?: string;
}

interface LeadInteraction {
  id: string;
  interaction_type: string;
  subject?: string;
  content?: string;
  created_at: string;
  scheduled_at?: string;
  completed_at?: string;
}

const LeadManagementDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadInteractions, setLeadInteractions] = useState<LeadInteraction[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, statusFilter, searchTerm]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadInteractions = async (leadId: string) => {
    try {
      const { data, error } = await supabase
        .from('lead_interactions')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeadInteractions(data || []);
    } catch (error) {
      console.error('Error fetching interactions:', error);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.lead_status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredLeads(filtered);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          lead_status: newStatus,
          contacted_at: newStatus === 'contacted' ? new Date().toISOString() : undefined
        })
        .eq('id', leadId);

      if (error) throw error;
      
      await fetchLeads();
      toast({
        title: "Success",
        description: "Lead status updated successfully"
      });
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast({
        title: "Error",
        description: "Failed to update lead status",
        variant: "destructive"
      });
    }
  };

  const addNote = async (leadId: string) => {
    if (!newNote.trim()) return;

    try {
      const { error: interactionError } = await supabase
        .from('lead_interactions')
        .insert([{
          lead_id: leadId,
          interaction_type: 'note',
          content: newNote,
          completed_at: new Date().toISOString()
        }]);

      if (interactionError) throw interactionError;

      await fetchLeadInteractions(leadId);
      setNewNote('');
      
      toast({
        title: "Success",
        description: "Note added successfully"
      });
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Error",
        description: "Failed to add note",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'qualified': 'bg-green-100 text-green-800',
      'proposal_sent': 'bg-purple-100 text-purple-800',
      'won': 'bg-emerald-100 text-emerald-800',
      'lost': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.lead_status === 'new').length,
    qualified: leads.filter(l => l.lead_status === 'qualified').length,
    highPriority: leads.filter(l => l.priority_score >= 70).length
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading leads...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">New Leads</p>
                <p className="text-2xl font-bold">{stats.new}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Qualified</p>
                <p className="text-2xl font-bold">{stats.qualified}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold">{stats.highPriority}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-1/3"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-1/4">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <div className="grid gap-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{lead.name}</h3>
                    <Badge className={getStatusColor(lead.lead_status)}>
                      {lead.lead_status.replace('_', ' ')}
                    </Badge>
                    <span className={`text-sm font-medium ${getPriorityColor(lead.priority_score)}`}>
                      Priority: {lead.priority_score}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {lead.email}
                    </div>
                    {lead.company && (
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {lead.company}
                      </div>
                    )}
                    {lead.project_type && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {lead.project_type}
                      </div>
                    )}
                    {lead.budget_range && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {lead.budget_range}
                      </div>
                    )}
                  </div>

                  {lead.project_description && (
                    <p className="text-sm mt-2 text-gray-600 line-clamp-2">
                      {lead.project_description}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Select value={lead.lead_status} onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedLead(lead);
                          fetchLeadInteractions(lead.id);
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Lead Details - {selectedLead?.name}</DialogTitle>
                      </DialogHeader>
                      
                      {selectedLead && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><strong>Email:</strong> {selectedLead.email}</div>
                            <div><strong>Company:</strong> {selectedLead.company || 'N/A'}</div>
                            <div><strong>Project Type:</strong> {selectedLead.project_type || 'N/A'}</div>
                            <div><strong>Budget:</strong> {selectedLead.budget_range || 'N/A'}</div>
                            <div><strong>Phone:</strong> {selectedLead.phone || 'N/A'}</div>
                            <div><strong>Website:</strong> {selectedLead.website || 'N/A'}</div>
                          </div>

                          {selectedLead.project_description && (
                            <div>
                              <strong>Project Description:</strong>
                              <p className="mt-1 text-sm bg-gray-50 p-3 rounded">
                                {selectedLead.project_description}
                              </p>
                            </div>
                          )}

                          <div>
                            <strong>Interactions:</strong>
                            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                              {leadInteractions.map((interaction) => (
                                <div key={interaction.id} className="text-sm bg-gray-50 p-2 rounded">
                                  <div className="font-medium">{interaction.interaction_type}</div>
                                  {interaction.subject && <div className="text-gray-600">{interaction.subject}</div>}
                                  {interaction.content && <div>{interaction.content}</div>}
                                  <div className="text-xs text-gray-500 mt-1">
                                    {new Date(interaction.created_at).toLocaleDateString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="newNote">Add Note</Label>
                            <Textarea
                              id="newNote"
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              placeholder="Add a note about this lead..."
                              className="mt-1"
                            />
                            <Button 
                              onClick={() => addNote(selectedLead.id)} 
                              className="mt-2"
                              disabled={!newNote.trim()}
                            >
                              Add Note
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No leads found matching your criteria.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeadManagementDashboard;